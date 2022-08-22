import React, { FC, useState } from 'react';
import styles from './Filters.module.scss';
import arrow from '../../assets/arrow-icon.svg';
import { setSort } from '../../redux/slices/filters';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Arrow from './Arrow';

const Sort: FC = () => {
  const sort = {
    name: 'Сортировка',
    items: [
      { id: 0, name: 'ranked', russian: 'По рейтингу' },
      { id: 1, name: 'popularity', russian: 'По популярности' },
      { id: 2, name: 'random', russian: 'Рандомно' },
    ],
  };
  
  const dispatch = useAppDispatch();
  const selectedSort = useAppSelector(state => state.filters.sort);
  const [isOpen , setIsOpen] = useState(false);

  const sortItemsJSX = sort.items.map((item) => (
    <li onClick={() => dispatch(setSort(item.name))} key={item.id}>
      <p className={selectedSort === item.name ? styles.active : ''}>{item.russian}</p>
    </li>
  ));

  return (
    <div className={styles.sort  + " " + styles.list}>
      <p onClick={() => setIsOpen(!isOpen)}>
        {sort.name} <Arrow className={isOpen ? styles.open : ''} />
      </p>
      {isOpen && <ul>{sortItemsJSX}</ul>}
    </div>
  );
};

export default Sort;
