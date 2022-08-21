import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Anime } from '../../models/Anime';
import SliderAnimes from '../SliderAnimes';

interface SimilarProps {
  id: number;
}

const Similar: FC<SimilarProps> = ({ id }) => {
  const [similar, setSimilar] = useState<Anime[]>();

  useEffect(() => {
    axios.get(`https://shikimori.one/api/animes/${id}/similar`).then(({ data }) => {
      setSimilar(data);
    });
  }, [id]);

  if (!similar) return <></>;
  return (
    <>
      <SliderAnimes elems={similar} />
    </>
  );
};

export default Similar;
