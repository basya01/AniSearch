import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PageState {
  page: number;
}

const initialState: PageState = {
  page: window.location.pathname === '/' ? 0 : 1,
};

export const pageSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;

export default pageSlice.reducer;
