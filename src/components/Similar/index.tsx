import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Anime } from '../../redux/slices/animes';
import AnimeItem from '../AnimeItem';
import { SampleNextArrow, SamplePrevArrow } from '../Screens';
import styles from './Similar.module.scss';

const Similiar:FC<{id: number}> = ({id}) => {
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
    className: styles.root,
  };
  
  return (
    <Slider {...settings}>
      {similar && similar.slice(0, 20).map((item) => <AnimeItem key={item.id} {...item} className={styles.similar}/>)}
    </Slider>
  );
};

export default Similiar;