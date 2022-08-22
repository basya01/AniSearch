import { FC } from 'react';
import ContentLoader from 'react-content-loader';
import { useAppSelector } from '../../hooks/redux';

const AnimeSkeleton: FC = () => {
  const theme = useAppSelector(state => state.theme);

  return (
    <ContentLoader
      speed={2}
      width={'100%'}
      height={420}
      backgroundColor={theme === 'light' ? "#f3f3f3" : "#252a2e"}
      foregroundColor={theme === 'light' ? "#ecebeb" : "#1E2326"}>
      <rect width="100%" height="420" />
    </ContentLoader>
  );
};

export default AnimeSkeleton;
