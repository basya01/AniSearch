import { configureStore } from '@reduxjs/toolkit';
import animes from './slices/animes';
import filters from './slices/filters';
import page from './slices/page';
import favorites from './slices/favorites';

export const store = configureStore({
  reducer: {
    animes,
    filters,
    page,
    favorites,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
