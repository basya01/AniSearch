import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FilterIcon from '../../assets/filter-icon.svg';
import AnimeItem from '../../components/AnimeItem';
import AnimeSkeleton from '../../components/AnimeItem/AnimeSkeleton';
import Filters from '../../components/Filters';
import { Anime, fetchAnimes } from '../../redux/slices/animes';
import { FilterState } from '../../redux/slices/filters';
import { setPage } from '../../redux/slices/page';
import { AppDispatch, RootState } from '../../redux/store';
import styles from './AnimeList.module.scss';

interface Item {
  aired_on: string;
  episodes: number;
  episodes_aired: number;
  id: number;
  image: { original: string };
  kind: string;
  name: string;
  released_on: string | null;
  russian: string;
  score: string;
  status: string;
  url: string;
}

const AnimeList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const animes = useSelector((state: RootState) => state.animes);
  const [filtersOpen, setFilterOpen] = useState(false);

  const { genres, sort, status, duration, kind, search } = useSelector<RootState, FilterState>(
    (state) => state.filters,
  );

  useEffect(() => {
    const queryParams = {
      genre: 'genre=' + genres.join(','),
      sort: 'order=' + sort,
      status: 'status=' + status,
      duration: 'duration=' + duration,
      kind: 'kind=' + kind,
      search: 'search=' + search,
    };

    const paramsUrl =
      '?' +
      qs.stringify(
        {
          genres: genres.join(',') || null,
          sort: sort || null,
          status: status || null,
          duration: duration || null,
          kind: kind || null,
          search: search || null,
        },
        { skipNulls: true },
      );

    navigate(paramsUrl);
    dispatch(fetchAnimes(queryParams));
  }, [genres, sort, status, duration, kind, search]);

  useEffect(() => {
    window.location.pathname === '/' ? dispatch(setPage(0)) : dispatch(setPage(1));
  }, []);

  const animeItems = animes.items.map((item) => <AnimeItem key={item.id} {...item} />);

  const skeletons = [...new Array(8)].map((_) => <AnimeSkeleton />);

  return (
    <section>
      <Filters isOpen={filtersOpen} setIsOpen={setFilterOpen} />
      <div className="container container__page">
        <div className={`container__content ${styles.position}`}>
          <div className={styles.wrapper}>
            <img
              onClick={() => setFilterOpen(!filtersOpen)}
              src={FilterIcon}
              alt="filters"
              className={styles.filters}
            />
          </div>
          <div className={styles.items}>{animes.status === 'pending' ? skeletons : animeItems}</div>
        </div>
      </div>
    </section>
  );
};

export default AnimeList;
