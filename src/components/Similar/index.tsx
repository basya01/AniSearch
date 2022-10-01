import { FC } from 'react';
import { Anime } from '../../models/Anime';
import SliderAnimes from '../SliderAnimes';

interface SimilarProps {
  similar: Anime[] | null;
}

const Similar: FC<SimilarProps> = ({ similar }) => {
  return (
    <>
      <SliderAnimes elems={similar} />
    </>
  );
};

export default Similar;
