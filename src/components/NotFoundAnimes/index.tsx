import React from 'react';
import styles from './NotFoundAnimes.module.scss';
import sadCat from '../../assets/sad-cat.png';

const NotFoundAnimes = () => {
  return (
    <div className={styles.root}>
      <img src={sadCat} alt="sad cat" />
      <p>
        {'Результаты не найдены :('}
        <br />
        <span>
          По заданным параметрам аниме не найдено. Попробуйте изменить настройки фильтров или
          проверьте свое подключение к интернету
        </span>
      </p>
    </div>
  );
};

export default NotFoundAnimes;
