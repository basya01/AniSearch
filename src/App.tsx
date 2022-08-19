import { FC, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Anime from './pages/Anime';
import AnimeList from './pages/AnimeSearch';
import Character from './pages/Character';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import './styles/App.scss';
import './styles/reset.scss';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="" element={<AnimeList />} />
        <Route path="favorites/:type" element={<Favorites />} />
        <Route path="anime/:id" element={<Anime />} />
        <Route path="character/:id" element={<Character />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
