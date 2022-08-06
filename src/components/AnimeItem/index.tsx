import React, { FC, useEffect } from 'react';
import styles from './AnimeItem.module.scss';
import StatusIcon from '../../assets/status-icon.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setActivePage } from '../../redux/slices/page';

export interface AnimeItemProps {
  id: number;
  russian: string;
  image: { original: string };
  released_on: string | null;
  score: string;
  status: string;
  className?: string;
}

const AnimeItem = React.forwardRef<HTMLDivElement, AnimeItemProps>((props, ref) => {
  const { id, russian, image, released_on, score, status, className } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const releasedYear = released_on ? released_on.slice(0, 4) : 'XXXX';

  const animeItemHandler = () => {
    navigate(`/anime/${id}`);
    dispatch(setActivePage(NaN));
  };

  return (
    <div className={styles.item + `${className ? ' ' + className : ''}`} onClick={animeItemHandler} ref={ref}>
      <img src={`https://shikimori.one${image.original}`} alt="" />
      <h3 className={styles.title}>{russian}</h3>
      <div className={styles.info}>
        <div>
          <img src={StatusIcon} alt="status" />
          <p>{status}</p>
        </div>
        <p>{releasedYear}</p>
      </div>
    </div>
  );
});

export default AnimeItem;
