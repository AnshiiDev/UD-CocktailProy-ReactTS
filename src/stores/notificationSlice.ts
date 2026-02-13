import type { StateCreator } from "zustand";
import type { RecipeSliceType } from "./recipeSlice";
import type { FavoritesSliceType } from "./favoritesSlice";

type Notification = {
  text: string;
  error: boolean;
  show: boolean;
};

export type NotificationSliceType = {
  notification: Notification;
  showNotification: (payload: Pick<Notification, "text" | "error">) => void;
  hideNotification: () => void;
};

export const createNotificationSlice: StateCreator<
  NotificationSliceType & RecipeSliceType & FavoritesSliceType,
  [],
  [],
  NotificationSliceType
> = (set, get) => ({
  notification: {
    text: "",
    error: false,
    show: false,
  },
  showNotification: (payload) => {
    set({
      notification: {
        text: payload.text,
        error: payload.error,
        show: true,
      },
    });

    setTimeout(() => {
      get().hideNotification();
    }, 3000);
  },
  hideNotification: () => {
    set({
      notification: {
        text: "",
        error: false,
        show: false,
      },
    });
  },
});

//slice pattern
