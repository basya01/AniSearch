import React, { FC } from 'react';
import styles from './Stars.module.scss';

interface Stars {
  score: number;
  maxScore: number;
  totalStars: number;
}

const Stars: FC<Stars> = ({ score, maxScore, totalStars }) => {
  const valOfDiv = maxScore / totalStars;
  const activeStars = Math.floor(score / valOfDiv);
  const floatStarOffset = (score - activeStars * valOfDiv) / valOfDiv * 100;

  const Star: FC<{ fillValue: string }> = ({ fillValue }) => (
    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="half" x1="0" x2="100%" y1="0" y2="0">
          <stop offset={floatStarOffset + '%'} stopColor="#74a3ff"></stop>
          <stop offset={floatStarOffset + '%'} stopColor="#d6d6d6"></stop>
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5 26.2884L26.697 32.5L23.9993 20.785L33 12.9067L21.1348 11.8784L16.5 0.833374L11.8651 11.8784L0 12.9067L9.00075 20.785L6.303 32.5L16.5 26.2884Z"
        fill={fillValue}
      />
    </svg>
  );

  return (
    <div className={styles.stars}>
      {[...Array(totalStars)].map((_, index) => {
        if (index < activeStars) {
          return <Star key={index} fillValue="#74A3FF"/>;
        } else if (index === activeStars) {
          return <Star key={index} fillValue={'url(#half)'} />;
        } else {
          return <Star key={index} fillValue="#D6D6D6" />;
        }
      })}
      <p>{score}</p>
    </div>
  );
};

export default Stars;
