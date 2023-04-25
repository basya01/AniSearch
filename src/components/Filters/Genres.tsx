import { FC, useState } from 'react';
import xmark from '../../assets/xmark-genre.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useFetch } from '../../hooks/useFetch';
import { Filter } from '../../models/Filters';
import { setGenres } from '../../redux/slices/filters';
import Arrow from './Arrow';
import styles from './Filters.module.scss';

const Genres: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [genresList, status] = useFetch<Filter[]>(`${process.env.REACT_APP_API_URL}/api/genres`, []);
  const genres = useAppSelector((state) => state.filters.genres);
  const dispatch = useAppDispatch();

  const genresItems = genresList
    ?.filter((item) => item.kind === 'anime')
    .map((item) => (
      <li onClick={() => dispatch(setGenres(item.id))} key={item.id}>
        <p className={genres.includes(item.id) ? styles.active : ''}>{item.russian}</p>
        {genres.includes(item.id) && <img src={xmark} alt="x" />}
      </li>
    ));

  return (
    <div className={styles.genres + ' ' + styles.list}>
      <p onClick={() => setIsOpen(!isOpen)}>
        Жанры <Arrow className={isOpen ? styles.open : ''} />
      </p>
      {status === 'error' ? (
        <p className={styles.notFound}>Жанры не найдены, порпобуйте перезагрузить страницу</p>
      ) : (
        isOpen && <ul>{genresItems}</ul>
      )}
    </div>
  );
};

export default Genres;
