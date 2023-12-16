import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: "favoritesSlice",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      return {
        ...state,

        favorites: [...state.favorites, action.payload],
      };
    },
    removeFromFavorites: (state, action) => {
      return {
        ...state,

        favorites: state.favorites.filter((item) => item.id !== action.payload),
      };
    },
  },
});

export const { actions: favoritesActions } = favoritesSlice;
export const { reducer: favoritesReducer } = favoritesSlice;
