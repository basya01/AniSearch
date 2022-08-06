import React, { FC } from 'react';
import { Video } from '../../pages/Anime/Anime';
import styles from './Videos.module.scss'

const Videos: FC<{ videos: Video[] }> = ({ videos }) => {
  return (
    <div className={styles.root}>
      {videos.map((item) => (
        <iframe key={item.id} width="640px" height="360px" src={item.player_url}></iframe>
      ))}
    </div>
  );
};

export default Videos;
