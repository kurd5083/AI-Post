import { create } from "zustand";

export const useChannelsStore = create((set) => ({
  selectedId: null,
  setId: (id) => set({ selectedId: id })
}));