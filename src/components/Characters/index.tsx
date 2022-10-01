import { FC } from 'react';
import { Role } from '../../models/Character';
import CharacterItem from '../CharacterItem';
import styles from './Characters.module.scss';

interface CharacterProps {
  characters: Role[] | null;
}

const Characters: FC<CharacterProps> = ({ characters }) => {
  return (
    <div className={styles.root}>
      {characters
        ?.map(({ character }) => (
          <CharacterItem key={character.id} character={character} className={styles.character} />
        ))}
    </div>
  );
};

export default Characters;
