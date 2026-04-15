import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FAVORITES_KEY } from '../utils/favorites';

export interface FavoriteItem {
  id?: string | number;
  url?: string;
  title?: string;
//   [key: string]: any;
}

export const useFavoritesStore = create<{
  favorites: FavoriteItem[];
  toggleFavorite: (item: string | number | FavoriteItem) => void;
  setFavorites: (list: FavoriteItem[]) => void;
  isFavorite: (item: string | number | FavoriteItem) => boolean;
}>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (item) => {
        const id = typeof item === 'object' ? (item.id ?? item.url ?? item.title) : item;
        const stringId = String(id);
        const current = get().favorites;

        if (current.some(f => String(f.id ?? f.url ?? f.title) === stringId)) {
          set({ favorites: current.filter(f => String(f.id ?? f.url ?? f.title) !== stringId) });
        } else {
          set({ favorites: [...current, typeof item === 'object' ? item : { id: stringId }] });
        }
      },
      setFavorites: (list) => set({ favorites: list }),
      isFavorite: (item) => {
        const id = typeof item === 'object' ? (item.id ?? item.url ?? item.title) : item;
        return get().favorites.some(f => String(f.id ?? f.url ?? f.title) === String(id));
      },
    }),
    { name: FAVORITES_KEY }
  )
);