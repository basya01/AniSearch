import React, { FC, MouseEvent, MouseEventHandler } from 'react';
import styles from './FavoriteIcon.module.scss';

interface FavoriteIconProps {
  active?: boolean;
  className?: string;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

const FavoriteIcon: FC<FavoriteIconProps> = ({ active, ...props}) => {
  return (
    <div {...props}>
      <svg viewBox="0 0 44 44" width="44" height="44" className={styles.root}>
        <circle cx="22" cy="22" r="22" fill="#FF6262" />
        {active ? (
          <path
            className={styles.icon}
            d="M11 20L9.405 18.5668C3.74 13.4714 0 10.109 0 5.99455C0 2.63215 2.6565 0 6.05 0C7.964 0 9.801 0.882834 11 2.27248C12.199 0.882834 14.036 0 15.95 0C19.3435 0 22 2.63215 22 5.99455C22 10.109 18.26 13.4714 12.595 18.5668L11 20Z"
            fill="white"
          />
        ) : (
          <path
            className={styles.icon}
            d="M15.95 0C14.036 0 12.199 0.863215 11 2.22198C9.801 0.863215 7.964 0 6.05 0C2.6565 0 0 2.57366 0 5.86134C0 9.88435 3.74 13.172 9.405 18.1542L11 19.5556L12.595 18.1542C18.26 13.172 22 9.88435 22 5.86134C22 2.57366 19.3435 0 15.95 0ZM11.1155 16.5769L11 16.6782L10.8845 16.5769C5.654 11.9784 2.2 8.9412 2.2 5.86134C2.2 3.73527 3.8555 2.1314 6.05 2.1314C7.744 2.1314 9.394 3.19176 9.9715 4.64644H12.023C12.606 3.19176 14.256 2.1314 15.95 2.1314C18.1445 2.1314 19.8 3.73527 19.8 5.86134C19.8 8.9412 16.346 11.9784 11.1155 16.5769Z"
            fill="white"
          />
        )}
      </svg>
    </div>
  );
};

export default FavoriteIcon;
