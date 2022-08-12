import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PageState {
  activePage: number | null;
}

const initialState: PageState = {
  activePage: 0,
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setActivePage: (state, action: PayloadAction<number | null>) => {
      state.activePage = action.payload;
    },
  },
});

export const { setActivePage } = pageSlice.actions;

export default pageSlice.reducer;
