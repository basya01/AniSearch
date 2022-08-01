import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PageState {
  activePage: number;
}

const initialState: PageState = {
  activePage: window.location.pathname === '/' ? 0 : 1,
};

export const pageSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setActivePage: (state, action: PayloadAction<number>) => {
      state.activePage = action.payload;
    },
  },
});

export const { setActivePage } = pageSlice.actions;

export default pageSlice.reducer;
