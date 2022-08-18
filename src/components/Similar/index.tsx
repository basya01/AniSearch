import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Anime } from '../../models/Anime';
import AnimeItem from '../AnimeItem';
import { SampleNextArrow, SamplePrevArrow } from '../Screens';
import SliderAnimes from '../SliderAnimes';
import styles from './Similar.module.scss';

const Similar: FC<{ id: number }> = ({ id }) => {
  const [similar, setSimilar] = useState<Anime[]>();

  useEffect(() => {
    axios.get(`https://shikimori.one/api/animes/${id}/similar`).then(({ data }) => {
      setSimilar(data);
    });
  }, [id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const slider = (
    <Slider {...settings}>
      {similar &&
        similar
          .slice(0, 20)
          .map((item) => <AnimeItem key={item.id} anime={item} className={styles.similar} />)}
    </Slider>
  );

  if (!similar) return <></>;

  return (
    <>
      <SliderAnimes elems={similar} />
    </>
  );
};

export default Similar;
