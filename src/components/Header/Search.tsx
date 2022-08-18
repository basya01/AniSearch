import React, { ChangeEvent, useCallback, useState } from 'react';
import SearchSVG from '../../assets/search-icon.svg';
import styles from './Header.module.scss';
import { setSearch } from '../../redux/slices/filters';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const Search = () => {
  const dispatch = useAppDispatch();
  const searchGlobal = useAppSelector((state) => state.filters.search);
  const [searchLocal, setSearchLocal] = useState(searchGlobal || '');

  const setSearchDebounce = useCallback(
    debounce((value) => dispatch(setSearch(value)), 500),
    [],
  );

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchLocal(event.target.value);
    setSearchDebounce(event.target.value);
  };

  return (
    <div className={styles.search}>
      <img src={SearchSVG} alt="" />
      <input
        onChange={searchHandler}
        type="text"
        className={styles.searchInput}
        placeholder="Поиск..."
        value={searchLocal}
      />
    </div>
  );
};

export default Search;
