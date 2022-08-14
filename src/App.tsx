import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Anime from './pages/Anime';
import AnimeList from './pages/AnimeSearch';
import Character from './pages/Character';
import Favorites from './pages/Favorites';
import { setActivePage } from './redux/slices/page';
import { AppDispatch } from './redux/store';
import './styles/App.scss';
import './styles/reset.scss';

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  console.log(useLocation());
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      dispatch(setActivePage(0));
    } else if (pathname.includes('/favorites/')) {
      dispatch(setActivePage(1));
    } else {
      dispatch(setActivePage(null));
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="" element={<AnimeList />} />
        <Route path="favorites/:type" element={<Favorites />} />
        <Route path="anime/:id" element={<Anime />} />
        <Route path="character/:id" element={<Character />} />
      </Route>
    </Routes>
  );
};

export default App;
