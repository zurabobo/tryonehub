import { create } from 'zustand';
import { isFavorite, toggleFavorite } from '../utils/favorites';

type SiteCardState = {
  previewTop: 'auto' | '200px';
  favoriteMap: Record<string, boolean>;
};

type SiteCardActions = {
  computePreviewPosition: (rect: DOMRect, windowHeight: number) => void;
  toggleFavorite: (siteId: string | object) => void;
  syncFavorite: (siteId: string) => void;
};

export const useSiteCardStore = create<SiteCardState & SiteCardActions>(
  (set, get) => ({
    previewTop: '200px',
    favoriteMap: {},

    computePreviewPosition: (rect, windowHeight) => {
      const overflow = rect.bottom + 200 > windowHeight;
      set({ previewTop: overflow ? 'auto' : '200px' });
    },

    toggleFavorite: (site) => {
      toggleFavorite(site);
      const id = typeof site === 'string' ? site : site.id;
      set((s) => ({
        favoriteMap: {
          ...s.favoriteMap,
          [id]: !s.favoriteMap[id],
        },
      }));
    },

    syncFavorite: (siteId) =>
      set((s) => ({
        favoriteMap: {
          ...s.favoriteMap,
          [siteId]: isFavorite(siteId),
        },
      })),
  })
);
