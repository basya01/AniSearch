import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Anime from './pages/Anime';
import AnimeList from './pages/AnimeList';
import Character from './pages/Character';
import { setActivePage } from './redux/slices/page';
import { AppDispatch } from './redux/store';
import './styles/App.scss';
import './styles/reset.scss';

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    if (window.location.pathname === '/') {
      dispatch(setActivePage(0));
    } else if (window.location.pathname === '/favorite') {
      dispatch(setActivePage(1));
    } else {
      dispatch(setActivePage(null));
    }
  }, [window.location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="" element={<AnimeList />} />
        <Route path="favorite" element={<div>Favorite</div>} />
        <Route path="anime/:id" element={<Anime />} />
        <Route path="character/:id" element={<Character />} />
      </Route>
    </Routes>
  );
};

export default App;
