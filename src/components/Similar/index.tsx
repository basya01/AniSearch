import { FC } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Anime } from '../../models/Anime';
import SliderAnimes from '../SliderAnimes';

interface SimilarProps {
  id: number;
}

const Similar: FC<SimilarProps> = ({ id }) => {
  const [similar, status] = useFetch<Anime[]>(`https://shikimori.one/api/animes/${id}/similar`, []);

  if (!similar || status === 'error') return <></>;
  
  return (
    <>
      <SliderAnimes elems={similar} />
    </>
  );
};

export default Similar;
