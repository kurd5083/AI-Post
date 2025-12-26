import { create } from 'zustand';

const useSearchStore = create((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  clearSearch: () => set({ searchQuery: '', openIndex: null }),
}));

export default useSearchStore;