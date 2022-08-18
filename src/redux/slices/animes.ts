import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Anime } from '../../models/Anime';

export enum Status {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface Animes {
  items: Anime[];
  status: Status;
}

const initialState: Animes = {
  items: [],
  status: Status.PENDING,
};

export const fetchAnimes = createAsyncThunk<Anime[], Record<string, string>>(
  'animes/fetchAnimes',
  async ({ genre, sort, status, duration, kind, search, page }) => {
    const { data } = await axios.get<Anime[]>(
      `https://shikimori.one/api/animes?limit=20&${genre}&${sort}&${status}&${duration}&${kind}&${search}&${page}`,
    );
    if(!data.length) {
      throw 'error';
    }
    return data;
  },
);

export const animesSlice = createSlice({
  name: 'animes',
  initialState,
  reducers: {
    clearAnimes: (state) => {
      state.items.splice(0, state.items.length);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimes.fulfilled, (state, action) => {
        state.items.push(...action.payload);
        state.status = Status.SUCCESS;
      })
      .addCase(fetchAnimes.pending, (state) => {
        state.status = Status.PENDING;
      })
      .addCase(fetchAnimes.rejected, (state) => {
        state.status = Status.ERROR;
      });
  },
});

export const { clearAnimes } = animesSlice.actions;

export default animesSlice.reducer;
