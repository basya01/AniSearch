import React from 'react';
import { useSelector } from 'react-redux';
import AnimeItem from '../../components/AnimeItem';
import { RootState } from '../../redux/store';
import styles from './Favorites.module.scss';

const Favorites = () => {
  const { animes, characters } = useSelector((state: RootState) => state.favorites);

  return (
    <section>
      <div className={`container container__page`}>
        <div className={styles.root}>
          <div className={styles.types}>
            <p>Аниме</p>
            <p>Персонажи</p>
          </div>
          <div className={styles.list}>
            {animes.map((item) => (
              <AnimeItem key={item.id} anime={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Favorites;
