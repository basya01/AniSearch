import { FC } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Role } from '../../models/Character';
import CharacterItem from '../CharacterItem';
import styles from './Characters.module.scss';

const Characters: FC<{ id: number }> = ({ id }) => {
  const [characters, status] = useFetch<Role[]>(`https://shikimori.one/api/animes/${id}/roles`, [
    id,
  ]);

  if (status === 'error') {
    return <></>;
  }

  return (
    <div className={styles.root}>
      {status === 'success' &&
        characters
          ?.filter((item: Role) => item.character && item.roles.includes('Main'))
          .map(({ character }) => (
            <CharacterItem key={character.id} character={character} className={styles.character} />
          ))}
    </div>
  );
};

export default Characters;
