import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import Slider from 'react-slick';

import arrowPrev from '../assets/arrow-prev.svg';
import arrowNext from '../assets/arrow-next.svg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Screen } from '../models/Filters';

export const SampleNextArrow = ({ className, style, onClick }: any) => {
  return (
    <img className={className} style={{ ...style }} onClick={onClick} src={arrowNext} alt=">" />
  );
};

export const SamplePrevArrow = ({ className, style, onClick }: any) => {
  return (
    <img className={className} style={{ ...style }} onClick={onClick} src={arrowPrev} alt="<" />
  );
};

interface ScreensProps {
  id: number;
}

const Screens: FC<ScreensProps> = ({ id }) => {
  const [screens, setScreens] = useState<Screen[]>();

  useEffect(() => {
    const fetchScreens = async () => {
      const { data } = await axios.get(`https://shikimori.one/api/animes/${id}/screenshots`);
      setScreens(data);
    };

    fetchScreens();
  }, [id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1225,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 790,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        }
      }
    ]
  };

  return (
    <div>
      {screens && (
        <Slider {...settings}>
          {screens.map((item) => (
            <img key={item.preview} src={`https://shikimori.one/${item.preview}`} alt="screen" />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Screens;
