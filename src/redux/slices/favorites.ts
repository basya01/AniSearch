import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Anime } from '../../models/Anime';
import { Character } from '../../models/Character';


export interface Favorites {
  animes: Anime[];
  characters: Character[];
}

const initialState: Favorites = {
  animes: [],
  characters: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addAnime: (state, action: PayloadAction<Anime>) => {
      state.animes.push(action.payload);
    },
    removeAnime: (state, action: PayloadAction<Anime>) => {
      state.animes = state.animes.filter((item) => item.id !== action.payload.id);
    },
    addCharacter: (state, action: PayloadAction<Character>) => {
      state.characters.push(action.payload);
    },
    removeCharacter: (state, action: PayloadAction<Character>) => {
      state.characters = state.characters.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addAnime, addCharacter, removeAnime, removeCharacter } = favoritesSlice.actions;

export default favoritesSlice.reducer;
