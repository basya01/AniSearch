import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FilterData } from '.';
import { AppDispatch } from '../../redux/store';
import styles from './Filters.module.scss';
import arrow from '../../assets/arrow-icon.svg';
import xmark from '../../assets/xmark-genre.svg';

interface FilterItemProps {
  filter: FilterData;
  setState: ActionCreatorWithPayload<string, string>;
  selected: string;
}

const FilterItem: FC<FilterItemProps> = ({ filter, setState, selected }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isOpen, setIsOpen] = useState(false);
  const filterItemsJSX = filter.items.map((item) => (
    <li onClick={() => dispatch(setState(item.name))} key={item.id}>
      <p className={selected === item.name ? styles.active : ''}>{item.russian}</p>
      {selected === item.name && <img src={xmark} alt="x" />} 
    </li>
  ));

  return (
    <div>
      <div className={styles.filter}>
        <p onClick={() => setIsOpen(!isOpen)}>
          {filter.name} <img className={isOpen ? styles.open : ''} src={arrow} alt="^" />
        </p>
        {isOpen && <ul>{filterItemsJSX}</ul>}
      </div>
    </div>
  );
};

export default FilterItem;
