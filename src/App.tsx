import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AnimeList from './pages/AnimeList/AnimeList';
import './styles/App.scss';
import './styles/reset.scss';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="" element={<AnimeList />} />
        <Route path="favorite" element={<div>Favorite</div>} />
      </Route>
    </Routes>
  );
};

export default App;
