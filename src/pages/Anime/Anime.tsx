import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './Anime.module.scss';

const Anime = () => {
  const [animeData, setAnimeData] = useState();
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
            <div className={styles.mainInfo}>
              <div>
                <img src={`https://shikimori.one${animeData.image.original}`} alt="anime_image" />
                <button>Добавить в избранное</button>
              </div>
              <div></div>
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
