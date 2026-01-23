import { create } from "zustand";
import normalizeUrl from "@/lib/normalizeUrl";

export const useLightboxStore = create((set) => ({
  isOpen: false,
  images: [],
  initialIndex: 0,

  openLightbox: ({ images, initialIndex = 0 }) =>
    set({
      isOpen: true,
      images: images?.map((img) => normalizeUrl(img)), // ✅ нормализация тут
      initialIndex,
    }),

  closeLightbox: () =>
    set({
      isOpen: false,
      images: [],
      initialIndex: 0,
    }),
}));
