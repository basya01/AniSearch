import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import AnimeItem from '../../components/AnimeItem';
import Button from '../../components/Button';
import { SampleNextArrow, SamplePrevArrow } from '../../components/Screens';
import SliderAnimes from '../../components/SliderAnimes';
import { Anime } from '../../redux/slices/animes';
import { addCharacter, removeCharacter } from '../../redux/slices/favorites';
import { AppDispatch, RootState } from '../../redux/store';
import { arrayToList } from '../../utils/arrayToList';
import styles from './Character.module.scss';

export interface Image {
  original: string;
  preview: string;
  x48: string;
  x96: string;
}

interface Seyu {
  id: number;
  image: Image;
  name: string;
  russian: string;
  url: string;
}

interface CharacterFull {
  id: number;
  image: Image;
  russian: string;
  name: string;
  altname: string;
  japanese: string;
  seyu: Seyu[];
  animes: Anime[];
  description: string;
  url: string;
}

const Character: FC = () => {
  const [character, setCharacter] = useState<CharacterFull>();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    axios.get(`https://shikimori.one/api/characters/${id}`).then(({ data }) => {
      setCharacter(data);
    });
  }, [id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const isFavCharacter = useSelector(
    (state: RootState) =>
      !!state.favorites.characters.filter((item) => item.id === Number(id)).length,
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

  return (
    <section>
      <div className="container container__page">
        <div className={`container__content--info-page ${styles.root}`}>
          {character && (
            <div className={styles.character}>
              <div className={styles.head}>
                <div>
                  <img
                    className={styles.characterImg}
                    src={`https://shikimori.one${character.image.original}`}
                    alt="anime_image"
                  />
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
