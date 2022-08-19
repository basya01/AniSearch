import React from 'react';
import ContentLoader from 'react-content-loader';

const AnimeSkeleton = () => (
  <ContentLoader
    speed={2}
    width={'100%'}
    height={420}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect width="100%" height="420" />
  </ContentLoader>
);

export default AnimeSkeleton;
