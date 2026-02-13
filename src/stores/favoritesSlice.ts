import type { StateCreator } from "zustand";
import type { Recipe } from "../types";
import { createRecipesSlice, type RecipeSliceType } from "./recipeSlice";
import {
  createNotificationSlice,
  type NotificationSliceType,
} from "./notificationSlice";

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe["idDrink"]) => boolean;
  loadFromStorage: () => void;
};

export const createFavoriteSlice: StateCreator<
  FavoritesSliceType & RecipeSliceType & NotificationSliceType,
  [],
  [],
  FavoritesSliceType
> = (set, get, api) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (get().favoriteExists(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink,
        ),
      }));

      createNotificationSlice(set, get, api).showNotification({
        text: "Se eliminó correctamente",
        error: false,
      });
    } else {
      set((state) => ({
        // favorites: [...get().favorites, recipe],
        favorites: [...state.favorites, recipe],
      }));

      createNotificationSlice(set, get, api).showNotification({
        text: "Agregado a favoritos",
        error: false,
      });
    }
    // Consumir estado de otra slice
    createRecipesSlice(set, get, api).closeModal();
    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },

  favoriteExists: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id);
  },

  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      set({
        //se enviará al Layout
        favorites: JSON.parse(storedFavorites),
      });
    }
  },
});

//slice pattern
