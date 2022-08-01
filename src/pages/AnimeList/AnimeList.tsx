import qs from 'qs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FilterIcon from '../../assets/filter-icon.svg';
import AnimeItem, { AnimeItemProps } from '../../components/AnimeItem';
import AnimeSkeleton from '../../components/AnimeItem/AnimeSkeleton';
import Filters from '../../components/Filters';
import { Anime, clearAnimes, fetchAnimes, Status } from '../../redux/slices/animes';
import { FilterState, setPage } from '../../redux/slices/filters';
import { setActivePage } from '../../redux/slices/page';
import { AppDispatch, RootState } from '../../redux/store';
import styles from './AnimeList.module.scss';
import debounce from 'lodash.debounce';
import NotFoundAnimes from '../../components/NotFoundAnimes';

const AnimeList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const animes = useSelector((state: RootState) => state.animes);
  const [filtersOpen, setFilterOpen] = useState(false);
  const lastItem = React.createRef<HTMLDivElement>();

  const { genres, sort, status, duration, kind, search, page } = useSelector<
    RootState,
    FilterState
  >((state) => state.filters);

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

  useEffect(() => {
    window.location.pathname === '/' ? dispatch(setActivePage(0)) : dispatch(setActivePage(1));
  }, []);


  const observerLoader = useRef<IntersectionObserver | null>();
  useEffect(() => {
    if (observerLoader.current) {
      observerLoader.current.disconnect();
    }

    observerLoader.current = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      if (animes.status !== Status.SUCCESS) return;
      if (entries[0].isIntersecting) {
        dispatch(setPage(page + 1));
      }
    });
    if (lastItem.current) {
      observerLoader.current.observe(lastItem.current);
    }
    return () => {
      if (observerLoader.current) {
        observerLoader.current.disconnect();
      }
    };
  }, [lastItem]);

  // const observer = useRef();
  // useEffect(() => {
  //   const callback = (entries) => {
  //     if(animes.status === 'pending') return;
  //     if (entries[0].isIntersecting) {
  //       dispatch(setPage(page + 1));
  //     }
  //   };

  //   const options = {
  //     root: document,
  //     rootMargin: "50px",
  //     threshold: 1
  //   };

  //   observer.current = new IntersectionObserver(callback, options);
  //   if (lastItem.current) {
  //     observer.current.observe(lastItem.current);
  //   }
  //   return () => {
  //     observer.current.disconnect();
  //   };
  // });

  const animeItems = animes.items.map((item, index) => {
    if (index + 1 === animes.items.length) {
      return <AnimeItem key={item.id} {...item} ref={lastItem} />;
    }
    return <AnimeItem key={item.id} {...item} />;
  });
  const skeletons = [...new Array(8)].map((_, index) => <AnimeSkeleton key={index} />);

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
          <div className={styles.items}>
            {animeItems}
            {animes.status === Status.PENDING && skeletons}
          </div>
          {animes.status === Status.ERROR &&  <NotFoundAnimes />}
        </div>
      </div>
    </section>
  );
};

export default AnimeList;
