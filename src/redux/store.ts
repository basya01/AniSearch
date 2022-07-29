import { configureStore } from '@reduxjs/toolkit';
import animes from './slices/animes';
import filters from './slices/filters';
import page from './slices/page';

export const store = configureStore({
  reducer: {
    animes,
    filters,
    page,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
