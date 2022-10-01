import { configureStore } from '@reduxjs/toolkit';
import animes from './slices/animes';
import filters from './slices/filters';
import favorites from './slices/favorites';
import theme from './slices/theme';


export const store = configureStore({
  reducer: {
    animes,
    filters,
    favorites,
    theme,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
