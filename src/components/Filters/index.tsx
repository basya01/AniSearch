import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import Genres from './Genres';
import styles from './Filters.module.scss';
import xmark from '../../assets/xmark.svg';
import Sort from './Sort';
import FilterItem from './FilterItem';
import { setDuration, setKind, setStatus } from '../../redux/slices/filters';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface FiltersProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface Filter {
  id: number;
  kind?: string;
  name: string;
  russian: string;
}

export interface FilterData {
  name: string;
  items: Filter[];
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

  const selectedStatus = useSelector<RootState, string>((state) => state.filters.status);
  const selectedDuration = useSelector<RootState, string>((state) => state.filters.duration);
  const selectedKind = useSelector<RootState, string>((state) => state.filters.kind);

  return (
    <div className={`${styles.filters} ${isOpen ? styles.open : ''}`}>
      <div className={`${styles.container} ${styles.containerLogo}`}>
        <h1 className={styles.logo}>
          <span>Ani</span>Search
        </h1>
        <img onClick={() => setIsOpen(false)} src={xmark} alt="x" />
      </div>
      <div className={`${styles.container} ${styles.containerFilters}`}>
        <p className={styles.filterPath}>Фильтры</p>
        <Sort />
        <Genres />
        <FilterItem filter={status} setState={setStatus} selected={selectedStatus} />
        <FilterItem filter={duration} setState={setDuration} selected={selectedDuration} />
        <FilterItem filter={kind} setState={setKind} selected={selectedKind} />
      </div>
    </div>
  );
};

export default Filters;
