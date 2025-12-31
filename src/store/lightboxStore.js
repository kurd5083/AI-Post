import { create } from "zustand";

export const useLightboxStore = create((set) => ({
  isOpen: false,
  images: [],
  initialIndex: 0,
  openLightbox: ({ images, initialIndex = 0 }) => set({ isOpen: true, images, initialIndex }),
  closeLightbox: () => set({ isOpen: false, images: [], initialIndex: 0 }),
}));
