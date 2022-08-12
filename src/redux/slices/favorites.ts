import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterInfo } from '../../components/Characters';
import { Anime } from './animes';


interface Favorites {
  animes: Anime[];
  characters: CharacterInfo[];
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
    addCharacter: (state, action: PayloadAction<CharacterInfo>) => {
      state.characters.push(action.payload);
    },
    removeCharacter: (state, action: PayloadAction<CharacterInfo>) => {
      state.animes = state.animes.filter((item) => item.id !== action.payload.character.id);
    },
  },
});

export const { addAnime, addCharacter, removeAnime } = favoritesSlice.actions;

export default favoritesSlice.reducer;
