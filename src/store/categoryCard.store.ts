import { create } from 'zustand';

type CategoryCardState = {
  hovered: boolean;
  showAdultModal: boolean;
};

type CategoryCardActions = {
  setHovered: (v: boolean) => void;
  openAdultModal: () => void;
  closeAdultModal: () => void;
};

export const useCategoryCardStore = create<
  CategoryCardState & CategoryCardActions
>((set) => ({
  hovered: false,
  showAdultModal: false,

  setHovered: (v) => set({ hovered: v }),
  openAdultModal: () => set({ showAdultModal: true }),
  closeAdultModal: () => set({ showAdultModal: false }),
}));
