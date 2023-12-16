import { configureStore } from "@reduxjs/toolkit";
import { favoritesReducer } from "../../../entities/favorites/models/slice/favoritesSlice.jsx";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});
