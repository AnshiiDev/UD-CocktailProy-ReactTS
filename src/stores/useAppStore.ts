import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, type RecipeSliceType } from "./recipeSlice";
import {
  createNotificationSlice,
  type NotificationSliceType,
} from "./notificationSlice";
import {
  createFavoriteSlice,
  type FavoritesSliceType,
} from "../stores/favoritesSlice";
import { createAISlice, type AISliceType } from "./aiSlice";

export const useAppStore = create<
  RecipeSliceType & FavoritesSliceType & NotificationSliceType & AISliceType
>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a),
    ...createAISlice(...a),
  })),
);
