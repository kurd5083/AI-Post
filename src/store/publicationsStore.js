import { create } from "zustand";

export const usePublicationsStore = create((set) => ({
  filter: "common",
  dateFilter: { period: "all", value: null },
  currentPage: 1,
  setFilter: (filter) => set({ filter, currentPage: 1 }),
  setDateFilter: (dateFilter) => set({ dateFilter, currentPage: 1 }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  reset: () =>
    set({
      filter: "common",
      dateFilter: { period: "all", value: null },
      currentPage: 1,
    }),
}));
