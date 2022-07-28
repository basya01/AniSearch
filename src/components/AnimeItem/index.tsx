import React, { FC } from 'react';
import styles from './AnimeItem.module.scss';
import StatusIcon from '../../assets/status-icon.svg';

interface AnimeItemProps {
  russian: string;
  image: { original: string };
  released_on: string | null;
  score: string;
  status: string;
}

const AnimeItem: FC<AnimeItemProps> = ({ russian, image, released_on, score, status }) => {
  const releasedYear = released_on ? released_on.slice(0, 4) : 'XXXX';
  
  return (
    <div className={styles.item}>
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
};

export default AnimeItem;
