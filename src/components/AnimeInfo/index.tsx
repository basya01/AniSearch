import React, { FC } from 'react';
import { AnimeFull } from '../../models/AnimeFull';
import { arrayToList } from '../../utils/arrayToList';
import styles from './AnimeInfo.module.scss';

const AnimeInfo: FC<{ anime: AnimeFull }> = ({ anime }) => {
  const kind = {
    tv: 'TV Сериал',
    movie: 'Фильм',
    ova: 'Ова',
    ona: 'Она',
    special: 'Специальный выпуск',
    music: 'Музыкальное видео',
    tv_13: 'TV Сериал (13)',
    tv_24: 'TV Сериал (24)',
    tv_48: 'TV Сериал (48)',
  };

  const status = {
    anons: 'Анонс',
    ongoing: 'Онгоинг',
    released: 'Релиз',
  };

  const rating = {
    none: 'без ограничений',
    g: 'для всех возрастов',
    pg: 'для детей',
    pg_13: '13+',
    r: '17+',
    r_plus: '18+ (легкая нагота)',
    rx: '18+ (сексуальный контент)',
  };

  return (
    <div className={styles.infoList}>
      <p>Информация</p>
      <ul>
        <li>
          <span>Тип: </span>
          {kind[anime.kind]}
        </li>
        <li>
          <span>Статус: </span>
          {status[anime.status]}
        </li>
        <li>
          <span>Кол-во серий: </span>
          {anime.episodes === 0 ? 'Неизвестно' : anime.episodes}
        </li>
        <li>
          <span>Дата релиза: </span>
          {anime.released_on ? anime.released_on : 'Неизвестно'}
        </li>
        <li>
          <span>Возрастные ограничения: </span>
          {rating[anime.rating]}
        </li>
        <li>
          <span>Продолжительность серии: </span>
          {anime.duration} мин
        </li>
        <li>
          <span>Озвучка: </span>
          {arrayToList(anime.fandubbers)}
        </li>
        <li>
          <span>Жанры: </span>
          {arrayToList(anime.genres, 'russian')}
        </li>
      </ul>
    </div>
  );
};

export default AnimeInfo;
