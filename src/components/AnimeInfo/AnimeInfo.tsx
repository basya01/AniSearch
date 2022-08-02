import React, { FC } from 'react';
import { AnimeFullInfo } from '../../pages/Anime/Anime';
import styles from './AnimeInfo.module.scss';

const AnimeInfo: FC<{animeData: AnimeFullInfo}> = ({ animeData }) => {
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
          {kind[animeData.kind]}
        </li>
        <li>
          <span>Статус: </span>
          {status[animeData.status]}
        </li>
        <li>
          <span>Кол-во серий: </span>
          {animeData.episodes === 0 ? 'Неизвестно' : animeData.episodes}
        </li>
        <li>
          <span>Дата релиза: </span>
          {animeData.released_on ? animeData.released_on : 'Неизвестно'}
        </li>
        <li>
          <span>Возрастные ограничения: </span>
          {rating[animeData.rating]}
        </li>
        <li>
          <span>Продолжительность серии: </span>
          {animeData.duration} мин
        </li>
        <li>
          <span>Озвучка: </span>
          {animeData.fandubbers.map((item, index) =>
            index + 1 === animeData.fandubbers.length ? item : item + ', ',
          )}
        </li>
        <li>
          <span>Жанры: </span>
          {animeData.genres.map((item, index) =>
            index + 1 === animeData.genres.length ? item.russian : item.russian + ', ',
          )}
        </li>
      </ul>
    </div>
  );
};

export default AnimeInfo;
