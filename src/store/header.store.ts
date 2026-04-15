import { create } from 'zustand';

type HeaderState = {
  menuOpen: boolean;
  categoriesOpen: boolean;
};

type HeaderActions = {
  toggleMenu: () => void;
  closeMenu: () => void;
  toggleCategories: () => void;
  closeCategories: () => void;
};

export const useHeaderStore = create<HeaderState & HeaderActions>((set) => ({
  menuOpen: false,
  categoriesOpen: false,

  toggleMenu: () =>
    set((s) => ({
      menuOpen: !s.menuOpen,
      categoriesOpen: false,
    })),

  closeMenu: () =>
    set({
      menuOpen: false,
      categoriesOpen: false,
    }),

  toggleCategories: () =>
    set((s) => ({
      categoriesOpen: !s.categoriesOpen,
    })),

  closeCategories: () =>
    set({
      categoriesOpen: false,
    }),
}));
