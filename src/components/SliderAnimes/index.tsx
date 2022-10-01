import { FC } from 'react';
import Slider from 'react-slick';
import { Anime } from '../../models/Anime';
import AnimeItem from '../AnimeItem';
import { SampleNextArrow, SamplePrevArrow } from '../Screens';
import styles from './SliderAnimes.module.scss';

interface SliderAnimesProps {
  elems: Anime[] | null;
}

const SliderAnimes: FC<SliderAnimesProps> = ({ elems }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    className: styles.slider,
    responsive: [
      {
        breakpoint: 1225,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 790,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: false,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        }
      }
    ]
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
