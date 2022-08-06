import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AnimeInfo from '../../components/AnimeInfo/AnimeInfo';
import Button from '../../components/Button';
import styles from './Anime.module.scss';
import Stars from '../../components/Stars';
import DiagramItem from '../../components/Diagram';
import Characters from '../../components/Characters';
import Screens from '../../components/Screens';
import Videos from '../../components/Videos';
import Similar from '../../components/Similar';

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

export interface Stats {
  name: number;
  value: number;
}

export interface Screen {
  original: string;
  preview: string;
}

export interface Video {
  id: number;
  url: string;
  image_url: string;
  player_url: string;
  name: string;
  kind: string;
  hosting: string;
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
  studios: Studio[];
  score: string;
  rates_scores_stats: Stats[];
  description: string;
  screenshots: Screen[];
  videos: Video[];
}

const Anime = () => {
  const [anime, setAnime] = useState<AnimeFullInfo>();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://shikimori.one/api/animes/${id}`).then(({ data }) => {
      setAnime(data);
    });

    window.scrollTo(0, 0);
  }, [id]);

  return (
    <section>
      <div className="container container__page">
        <div className={`container__content--anime ${styles.root}`}>
          {anime && (
            <div className={styles.anime}>
              <div className={styles.head}>
                <div>
                  <img
                    className={styles.animeImg}
                    src={`https://shikimori.one${anime.image.original}`}
                    alt="anime_image"
                  />
                  <Button>Добавить в избранное</Button>
                </div>
                <div className={styles.info}>
                  <h2 className={styles.name}>
                    {anime.russian} ({anime.name})
                  </h2>
                  <div className={styles.mainInfo}>
                    <AnimeInfo anime={anime} />
                    <div className={styles.infoBlock}>
                      <div className={styles.rating}>
                        <p>Рейтинг:</p>
                        <Stars score={+anime.score} totalStars={5} maxScore={10} />
                      </div>
                      <div className={styles.studio}>
                        <p>Студии:</p>
                        {anime.studios.map((item) => (
                          <img src={`https://shikimori.one/${item.image}`} alt="" key={item.id} />
                        ))}
                      </div>
                    </div>
                    <div className={styles.stats}>
                      <p>Статистика оценок:</p>
                      <div className={styles.diagram}>
                        <DiagramItem stats={anime.rates_scores_stats} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {anime.description && (
                <div className={styles.description}>
                  <h2 className={styles.path}>Описание</h2>
                  <p>{anime.description}</p>
                </div>
              )}
              <div className={styles.characters}>
                <h2 className={styles.path}>Главные персонажи</h2>
                <Characters id={Number(id)} />
              </div>
              <div className={styles.screenshots}>
                <h2 className={styles.path}>Скриншоты</h2>
                <Screens id={Number(id)}></Screens>
              </div>
              <div className={styles.videos}>
                <h2 className={styles.path}>Видеозаписи</h2>
                <Videos videos={anime.videos} />
              </div>
              <div className={styles.similar}>
                <h2 className={styles.path}>Похожие аниме</h2>
                <Similar id={Number(id)} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Anime;
