import React, { ChangeEvent, useCallback, useState } from 'react';
import SearchSVG from '../../assets/search-icon.svg';
import styles from './Header.module.scss';
import { setSearch } from '../../redux/slices/filters';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchGlobal = useSelector<RootState, string>((state) => state.filters.search);
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
