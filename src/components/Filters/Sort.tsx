import React, { FC, useState } from 'react';
import styles from './Filters.module.scss';
import arrow from '../../assets/arrow-icon.svg';
import { setSort } from '../../redux/slices/filters';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

const Sort: FC = () => {
  const sort = {
    name: 'Сортировка',
    items: [
      { id: 0, name: 'ranked', russian: 'По рейтингу' },
      { id: 1, name: 'popularity', russian: 'По популярности' },
      { id: 2, name: 'random', russian: 'Рандомно' },
    ],
  };
  
  const dispatch = useDispatch<AppDispatch>();
  const selectedSort = useSelector<RootState, string>(state => state.filters.sort);
  const [isOpen , setIsOpen] = useState(false);

  const sortItemsJSX = sort.items.map((item) => (
    <li onClick={() => dispatch(setSort(item.name))} key={item.id}>
      <p className={selectedSort === item.name ? styles.active : ''}>{item.russian}</p>
    </li>
  ));

  return (
    <div className={styles.sort}>
      <p onClick={() => setIsOpen(!isOpen)}>
        {sort.name} <img className={isOpen ? styles.open : ''} src={arrow} alt="^" />
      </p>
      {isOpen && <ul>{sortItemsJSX}</ul>}
    </div>
  );
};

export default Sort;
