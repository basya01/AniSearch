import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  genres: number[];
  sort: string;
  status: string;
  duration: string;
  kind: string;
  search: string;
}

const initialState: FilterState = {
  genres: [],
  sort: 'ranked',
  status: '',
  duration: '',
  kind: '',
  search: '',
};

export const filtersSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<number>) => {
      const genreIndex = state.genres.indexOf(action.payload);
      genreIndex === -1 ? state.genres.push(action.payload) : state.genres.splice(genreIndex, 1);
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = state.status === action.payload ? '' : action.payload;
    },
    setDuration: (state, action: PayloadAction<string>) => {
      state.duration = state.duration === action.payload ? '' : action.payload;
    },
    setKind: (state, action: PayloadAction<string>) => {
      state.kind = state.kind === action.payload ? '' : action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = state.search === action.payload ? '' : action.payload;
    },
  },
});

export const { setGenres, setSort, setStatus, setDuration, setKind, setSearch } =
  filtersSlice.actions;

export default filtersSlice.reducer;
