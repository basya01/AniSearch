import { configureStore } from '@reduxjs/toolkit';
import animes from './slices/animes';
import filters from './slices/filters';

export const store = configureStore({
  reducer: {
    animes,
    filters,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
