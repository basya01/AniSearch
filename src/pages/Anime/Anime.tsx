import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AnimeInfo from '../../components/AnimeInfo/AnimeInfo';
import Button from '../../components/Button';
import styles from './Anime.module.scss';
import star from '../../assets/star.svg';

interface Genre {
  id: number;
  name: string;
  russian: string;
  kind: string;
}

interface Studio {
  filtered_name: string;
  id: number;
  image: string;
  name: string;
  real: boolean;
}

export interface AnimeFullInfo {
  image: {
    original: string;
  };
  kind: 'tv' | 'movie' | 'ova' | 'ona' | 'special' | 'music' | 'tv_13' | 'tv_24' | 'tv_48';
  russian: string;
  name: string;
  status: 'anons' | 'ongoing' | 'released';
  episodes: number;
  released_on: string;
  rating: 'none' | 'g' | 'pg' | 'r' | 'r_plus' | 'rx';
  duration: number;
  fandubbers: string[];
  genres: Genre[];
  studios: Studio[]
}

const Anime = () => {
  const [animeData, setAnimeData] = useState<AnimeFullInfo>();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://shikimori.one/api/animes/${id}`).then(({ data }) => {
      setAnimeData(data);
    });
  }, []);

  return (
    <section>
      <div className="container container__page">
        <div className={`container__content--anime ${styles.root}`}>
          {animeData ? (
            <div className={styles.anime}>
              <div>
                <img
                  className={styles.animeImg}
                  src={`https://shikimori.one${animeData.image.original}`}
                  alt="anime_image"
                />
                <Button>Добавить в избранное</Button>
              </div>
              <div className={styles.info}>
                <h2 className={styles.name}>
                  {animeData.russian} ({animeData.name})
                </h2>
                <div className={styles.mainInfo}>
                  <AnimeInfo animeData={animeData} />
                  <div className={styles.infoBlock}>
                    <div className={styles.rating}>
                      <p>Рейтинг:</p>
                      <div className={styles.stars}>
                        <img src={star} alt="*" />
                        <img src={star} alt="*" />
                        <img src={star} alt="*" />
                        <img src={star} alt="*" />
                        <img src={star} alt="*" />
                      </div>
                    </div>
                    <div className={styles.studio}>
                      <p>Студии: </p>
                      {animeData.studios.map(item => <img src={`https://shikimori.one/${item.image}`} alt="" key={item.id}/>)}
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
              <div></div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </section>
  );
};

export default Anime;
