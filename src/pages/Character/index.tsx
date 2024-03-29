import { FC } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import SliderAnimes from '../../components/SliderAnimes';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useFetch } from '../../hooks/useFetch';
import { CharacterFull } from '../../models/CharacterFull';
import { addCharacter, removeCharacter } from '../../redux/slices/favorites';
import { arrayToList } from '../../utils/arrayToList';
import NotFound from '../NotFound';
import styles from './Character.module.scss';

const Character: FC = () => {
  const { id } = useParams();
  const [character, status] = useFetch<CharacterFull>(
    `${process.env.REACT_APP_API_URL}/api/characters/${id}`,
    [id],
  );
  const dispatch = useAppDispatch();

  const isFavCharacter = useAppSelector(
    (state) => !!state.favorites.characters.filter((item) => item.id === Number(id)).length,
  );

  const buttonFavHandler = () => {
    if (!character) return;

    const characterPart = {
      id: character.id,
      name: character.name,
      russian: character.russian,
      image: character.image,
      url: character.url,
    };

    if (isFavCharacter && characterPart) {
      dispatch(removeCharacter(characterPart));
    } else {
      dispatch(addCharacter(characterPart));
    }
  };

  if (status === 'error') {
    return <NotFound />;
  }

  return (
    <section>
      <div className="container container__page">
        <div className="container__content">
          {character && status === 'success' && (
            <div className={styles.character}>
              <div className={styles.head}>
                <div className={styles.characterImg}>
                  <img src={`${process.env.REACT_APP_API_URL}${character.image.original}`} alt="anime_image" />
                  <Button active={isFavCharacter} onClick={buttonFavHandler}>
                    {isFavCharacter ? 'Убрать из избранного' : 'Добавить в избранное'}
                  </Button>
                </div>
                <div className={styles.info}>
                  <h1 className={styles.name}>
                    {character.russian} ({character.name})
                  </h1>
                  <div className={styles.mainInfo}>
                    <p>Информация</p>
                    <ul>
                      <li>
                        <span>Альтернативные имена: </span>
                        {character.altname}
                      </li>
                      <li>
                        <span>На японском: </span>
                        {character.japanese}
                      </li>
                      <li>
                        <span>Аниме: </span>
                        {arrayToList(character.animes, 'russian')}
                      </li>
                      <li>
                        <span>Сейю: </span>
                        {arrayToList(character.seyu, 'russian')}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.description}>
                <p className={styles.path}>Описание</p>
                <p>{character.description}</p>
              </div>
              <div>
                <p className={styles.path}>Аниме</p>
                <SliderAnimes elems={character.animes} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Character;
