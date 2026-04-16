import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  ids: string[];
  toggle: (key: string) => void;
  isFavorite: (key: string) => boolean;
}


export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (key) =>
        set((state) => ({
          ids: state.ids.includes(key)
            ? state.ids.filter((x) => x !== key)
            : [...state.ids, key],
        })),
      isFavorite: (key) => get().ids.includes(key),
    }),
    { name: "favorites" }
  )
);
