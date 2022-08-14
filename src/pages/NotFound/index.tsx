import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import cat from '../../assets/sad-cat.png';

import styles from './NotFound.module.scss';

const NotFound: FC = () => {
  return (
    <div className={`container container__page ${styles.root}`}>
      <img src={cat} alt="sad cat" />
      <p>{'Страница не найдена :('}</p>
      <Link to="/">
        <button>Перейти к списку аниме</button>
      </Link>
    </div>
  );
};

export default NotFound;
