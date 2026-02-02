import { create } from "zustand";

export const useAnalyticsFilterStore = create((set) => ({
  selectedFilter: "24h",
  setSelectedFilter: (filter) => set({ selectedFilter: filter }),
}));