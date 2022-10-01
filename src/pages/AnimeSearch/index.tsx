import qs from 'qs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterIcon from '../../assets/filter-icon.svg';
import AnimeItem, { AnimeItemProps } from '../../components/AnimeItem';
import AnimeSkeleton from '../../components/AnimeItem/AnimeSkeleton';
import Filters from '../../components/Filters';
import { clearAnimes, fetchAnimes, Status } from '../../redux/slices/animes';
import { FilterState, setPage } from '../../redux/slices/filters';
import styles from './AnimeSearch.module.scss';
import NotFoundAnimes from '../../components/NotFoundAnimes';
import AnimeList from '../../components/AnimeList/AnimeList';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const AnimeSearch = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const animes = useAppSelector((state) => state.animes);
  const [filtersOpen, setFilterOpen] = useState(false);
  const lastItem = React.createRef<HTMLDivElement>();

  const { genres, sort, status, duration, kind, search, page } = useAppSelector(
    (state) => state.filters,
  );

  const fetchAnime = () => {
    const queryParams = {
      genre: 'genre=' + genres.join(','),
      sort: 'order=' + sort,
      status: 'status=' + status,
      duration: 'duration=' + duration,
      kind: 'kind=' + kind,
      search: 'search=' + search,
      page: 'page=' + page,
    };
    dispatch(fetchAnimes(queryParams));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
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

    if (page === 1) fetchAnime();
    dispatch(setPage(1));

    dispatch(clearAnimes());
    navigate(paramsUrl);
  }, [genres, sort, status, duration, kind, search]);

  const fLoad = useRef(true);
  useEffect(() => {
    if (fLoad.current) {
      fLoad.current = false;
      return;
    }

    fetchAnime();
  }, [page]);

  return (
    <section>
      <Filters isOpen={filtersOpen} setIsOpen={setFilterOpen} />
      <div className="container container__page">
        <div className={`container__content ${styles.position}`}>
          <div className={styles.filterIcon}>
            <img
              onClick={() => setFilterOpen(!filtersOpen)}
              src={FilterIcon}
              alt="filters"
              className={styles.filters}
            />
          </div>
          <AnimeList />
          {animes.status === Status.ERROR && <NotFoundAnimes />}
        </div>
      </div>
    </section>
  );
};

export default AnimeSearch;
