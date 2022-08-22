import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import Genres from './Genres';
import styles from './Filters.module.scss';
import xmark from '../../assets/xmark.svg';
import Sort from './Sort';
import FilterItem from './FilterItem';
import { setDuration, setKind, setStatus } from '../../redux/slices/filters';
import { useAppSelector } from '../../hooks/redux';
import ThemeToggler from '../ThemeToggler.tsx';

interface FiltersProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Filters: FC<FiltersProps> = ({ isOpen, setIsOpen }) => {
  const status = {
    name: 'Статус',
    items: [
      { id: 0, name: 'anons', russian: 'Анонс' },
      { id: 1, name: 'ongoing', russian: 'Онгоинг' },
      { id: 2, name: 'released', russian: 'Релиз' },
    ],
  };

  const duration = {
    name: 'Хронометраж',
    items: [
      { id: 0, name: 'S', russian: 'Менее 10 минут' },
      { id: 1, name: 'D', russian: 'Менее 30 минут' },
      { id: 2, name: 'F', russian: 'Более 30 минут' },
    ],
  };

  const kind = {
    name: 'Тип',
    items: [
      { id: 0, name: 'tv', russian: 'TV Сериал' },
      { id: 1, name: 'movie', russian: 'Фильм' },
      { id: 2, name: 'ova', russian: 'Ова' },
      { id: 3, name: 'ona', russian: 'Она' },
      { id: 4, name: 'special', russian: 'Специальный выпуск' },
      { id: 5, name: 'music', russian: 'Музыкальное видео' },
      { id: 6, name: 'tv_13', russian: 'TV Сериал (13)' },
      { id: 7, name: 'tv_24', russian: 'TV Сериал (24)' },
      { id: 8, name: 'tv_48', russian: 'TV Сериал (48)' },
    ],
  };

  const filters = useAppSelector((state) => state.filters);

  return (
    <div className={`${styles.filters} ${isOpen ? styles.open : ''}`}>
      <div className={`${styles.container} ${styles.containerLogo}`}>
        <h1 className={styles.logo}>
          <span>Ani</span>Search
        </h1>
        <svg
          onClick={() => setIsOpen(false)}
          className={styles.xmark}
          width="20"
          height="22"
          viewBox="0 0 20 22"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.2167 18.3596L12.5847 11.2518L19.2167 4.1439C19.9327 3.37651 19.9327 2.14107 19.2167 1.37368C18.5007 0.606295 17.348 0.606295 16.6319 1.37368L9.9999 8.48154L3.36787 1.37368C2.65186 0.606295 1.49912 0.606295 0.783106 1.37368C0.0670899 2.14107 0.0670899 3.37651 0.783106 4.1439L7.41514 11.2518L0.783106 18.3596C0.0670899 19.127 0.0670899 20.3624 0.783106 21.1298C1.49912 21.8972 2.65186 21.8972 3.36787 21.1298L9.9999 14.022L16.6319 21.1298C17.348 21.8972 18.5007 21.8972 19.2167 21.1298C19.9276 20.3624 19.9276 19.1216 19.2167 18.3596Z"
          />
        </svg>
      </div>
      <div className={`${styles.container} ${styles.containerFilters}`}>
        <p className={styles.filterPath}>Фильтры</p>
        <Sort />
        <Genres />
        <FilterItem filter={status} setState={setStatus} selected={filters.status} />
        <FilterItem filter={duration} setState={setDuration} selected={filters.duration} />
        <FilterItem filter={kind} setState={setKind} selected={filters.kind} />
      </div>
    </div>
  );
};

export default Filters;
