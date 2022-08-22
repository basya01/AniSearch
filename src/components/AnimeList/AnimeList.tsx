import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Animes, Status } from '../../redux/slices/animes';
import { FilterState, setPage } from '../../redux/slices/filters';
import AnimeItem from '../AnimeItem';
import AnimeSkeleton from '../AnimeItem/AnimeSkeleton';
import styles from './AnimeList.module.scss';

const AnimeList = () => {
  const dispatch = useAppDispatch();
  const animes = useAppSelector((state) => state.animes);
  const page = useAppSelector((state) => state.filters.page);

  const lastItem = React.createRef<HTMLDivElement>();
  const observerLoader = useRef<IntersectionObserver>();
  
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

  const skeletons = [...new Array(10)].map((_, index) => <AnimeSkeleton key={index} />);

  return (
    <div className={styles.root}>
      {animes.items.map((item, index) => {
        if (index + 1 === animes.items.length) {
          return <AnimeItem key={item.id} anime={item} ref={lastItem} />;
        }
        return <AnimeItem key={item.id} anime={item} />;
      })}
      {animes.status === 'pending' && skeletons }
    </div>
  );
};

export default AnimeList;
