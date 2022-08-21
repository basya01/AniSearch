import React, { FC, useEffect, useRef, useState } from 'react';
import { Video } from '../../models/Filters';
import styles from './Videos.module.scss';

const Videos: FC<{ videos: Video[] }> = ({ videos }) => {
  const iFrame = useRef<HTMLIFrameElement>(null);

  const getHeight = () => {
    if (iFrame.current) {
      return (iFrame.current.offsetWidth / 16) * 9;
    }

    return 0;
  };

  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(getHeight())
  }, [iFrame.current])

  const updateHeight = () => {
    setHeight(getHeight());
  };

  useEffect(() => {
    window.addEventListener('resize', updateHeight);
  }, []);

  return (
    <div className={styles.root}>
      {videos.map((item) => (
        <iframe
          ref={iFrame}
          key={item.id}
          width="100%"
          height={height + 'px'}
          src={item.player_url.replace('http', 'https')}></iframe>
      ))}
    </div>
  );
};

export default Videos;
