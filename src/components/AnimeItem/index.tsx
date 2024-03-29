import React, { FC, MouseEvent, useEffect } from 'react';
import styles from './AnimeItem.module.scss';
import StatusIcon from '../../assets/status-icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FavoriteIcon from './FavoriteIcon';
import { addAnime, removeAnime } from '../../redux/slices/favorites';
import { Anime } from '../../models/Anime';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

export interface AnimeItemProps {
  anime: Anime;
  className?: string;
}

const AnimeItem = React.forwardRef<HTMLDivElement, AnimeItemProps>(({ anime, className }, ref) => {
  const { id, russian, image, released_on, score, status } = anime;
  const dispatch = useAppDispatch();
  const releasedYear = released_on ? released_on.slice(0, 4) : 'XXXX';
  const isFavAnimes = useAppSelector(
    (state) => !!state.favorites.animes.filter((item) => item.id === anime.id).length,
  );

  const favoriteHandler = (event: MouseEvent<HTMLDivElement>) => {
    if (isFavAnimes) {
      dispatch(removeAnime(anime));
    } else {
      dispatch(addAnime(anime));
    }
    event.preventDefault();
  };

  return (
    <Link to={`/anime/${id}`} className={styles.root + `${className ? ' ' + className : ''}`}>
      <div className={styles.item} ref={ref}>
        <img src={`${process.env.REACT_APP_API_URL}${image.original}`} alt="" />
        <FavoriteIcon
          active={!!isFavAnimes}
          className={styles.favorite}
          onClick={(event: MouseEvent<HTMLDivElement>) => favoriteHandler(event)}
        />
        <p className={styles.score}>{score}</p>
        <h3 className={styles.title}>{russian}</h3>
        <div className={styles.info}>
          <div>
            <img src={StatusIcon} alt="status" />
            <p>{status}</p>
          </div>
          <p>{releasedYear}</p>
        </div>
      </div>
    </Link>
  );
});

export default AnimeItem;
