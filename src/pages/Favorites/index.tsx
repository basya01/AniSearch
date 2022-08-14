import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import AnimeItem from '../../components/AnimeItem';
import CharacterItem from '../../components/CharacterItem';
import { Anime } from '../../redux/slices/animes';
import { Favorites as IFavorites } from '../../redux/slices/favorites';
import { RootState } from '../../redux/store';
import NotFound from '../NotFound';
import styles from './Favorites.module.scss';

const Favorites = () => {
  const { animes, characters } = useSelector<RootState, IFavorites>((state) => state.favorites);
  const { type } = useParams();

  const { pathname } = useLocation();

  const [activeType, setActiveType] = useState<number | null>(0);

  useEffect(() => {
    if (pathname === '/favorites/animes') {
      setActiveType(0);
    } else if (pathname === '/favorites/characters') {
      setActiveType(1);
    } else {
      setActiveType(null);
    }
  }, [pathname]);

  if (type !== 'animes' && type !== 'characters') {
    return (
      <NotFound />
    );
  }

  return (
    <section>
      <div className={`container container__page`}>
        <div className={styles.root}>
          <div className={styles.types}>
            <Link to="/favorites/animes">
              <p className={activeType === 0 ? styles.active : ''}>Аниме</p>
            </Link>
            <Link to="/favorites/characters">
              <p className={activeType === 1 ? styles.active : ''}>Персонажи</p>
            </Link>
          </div>
            {type === 'animes' && (
              <div className={styles.list}>
                {animes.map((item) => (
                  <AnimeItem key={item.id} anime={item} />
                ))}
              </div>
            )}
            {type === 'characters' && (
              <div className={styles.list}>
                {characters.map((item) => (
                  <CharacterItem key={item.id} character={item} />
                ))}
              </div>
            )}
            {(type === 'animes' && animes.length === 0) && 'Нет избранных аниме'}
            {(type === 'characters' && characters.length === 0) && 'Нет избранных персонажей'}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
