import React, { FC, useEffect, useState } from 'react';
import styles from './Filters.module.scss';
import arrow from '../../assets/arrow-icon.svg';
import { Filter, FilterData } from './index';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { setGenres } from '../../redux/slices/filters';
import { useSelector } from 'react-redux';
import xmark from '../../assets/xmark-genre.svg';

const Genres: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [genresList, setGenresList] = useState<FilterData>({ name: 'Жанры', items: [] });
  const genres = useSelector<RootState, number[]>((state) => state.filters.genres);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchGenres = async () => {
      const { data } = await axios.get<Filter[]>('https://shikimori.one/api/genres');
      setGenresList({ name: 'Жанры', items: data.filter((item) => item.kind === 'anime') });
    };

    fetchGenres();
  }, []);


  const genresItems = genresList.items.map((item) => (
    <li onClick={() => dispatch(setGenres(item.id))} key={item.id}>
      <p className={genres.includes(item.id) ? styles.active : ''}>{item.russian}</p>
      {genres.includes(item.id) && <img src={xmark} alt="x" />}
    </li>
  ));

  return (
    <div className={styles.genres}>
      <p onClick={() => setIsOpen(!isOpen)}>
        {genresList.name} <img className={isOpen ? styles.open : '' } src={arrow} alt="^" />
      </p>
      {isOpen && <ul>{genresItems}</ul>}
    </div>
  );
};

export default Genres;
