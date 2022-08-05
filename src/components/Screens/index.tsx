import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Screen } from '../../pages/Anime/Anime';
import styles from './Screens.module.scss';
import Slider from 'react-slick';

import arrowPrev from '../../assets/arrow-prev.svg';
import arrowNext from '../../assets/arrow-next.svg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Screens: FC<{ id: number }> = ({ id }) => {
  const [screens, setScreens] = useState<Screen[]>();

  useEffect(() => {
    const fetchScreens = async () => {
      const { data } = await axios.get(`https://shikimori.one/api/animes/${id}/screenshots`);
      setScreens(data);
    };

    fetchScreens();
  }, []);

  const SampleNextArrow = ({ className, style, onClick }: any) => {
    return (
      <img className={className} style={{...style}} onClick={onClick} src={arrowNext} alt=">"/>
    );
  };

  const SamplePrevArrow = ({ className, style, onClick }: any) => {
    return (
      <img className={className} style={{...style}} onClick={onClick} src={arrowPrev} alt="<"/>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className={styles.root}>
      {screens && (
        <Slider {...settings}>
          {screens.map((item, index) => (
            <div>
              <img src={`https://shikimori.one/${item.preview}`} alt="screen" />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Screens;
