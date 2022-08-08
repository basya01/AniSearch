import React, { FC } from 'react';
import { Stats } from '../../pages/Anime';
import styles from './Diagram.module.scss';

const Diagram: FC<{ stats: Stats[] }> = ({ stats }) => {
  const maxHeight = 173;
  const maxValue = Math.max(...stats.map(item => item.value));

  const statsPx = stats.map((item) => {
    return { name: item.name, value: item.value, height: (item.value * maxHeight) / maxValue };
  });

  return (
    <div className={styles.root}>
      {statsPx.map((item) => (
        <div className={styles.item} key={item.name}>
          <p className={styles.quality}>{item.value}</p>
          <div className={styles.index} style={{ height: item.height }}></div>
          <p className={styles.score}>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Diagram;
