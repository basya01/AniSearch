import React, { FC } from 'react';
import Slider from 'react-slick';
import { Anime } from '../../models/Anime';
import AnimeItem from '../AnimeItem';
import { SampleNextArrow, SamplePrevArrow } from '../Screens';
import styles from './SliderAnimes.module.scss';

const SliderAnimes: FC<{elems: Anime[]}> = ({ elems }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  if (!elems) return <></>;

  return (
    <>
      {elems.length >= settings.slidesToShow ? (
        <Slider {...settings}>
          {elems.slice(0, 20).map((item) => (
            <AnimeItem key={item.id} anime={item} className={styles.elem} />
          ))}
        </Slider>
      ) : (
        <div className={styles.noSlider}>
          {elems.map((item) => (
            <AnimeItem key={item.id} anime={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default SliderAnimes;
