import { create } from 'zustand';

export const useViewStore = create((set) => ({
  viewType: 'grid',
  
  setGridView: () => set({ viewType: 'grid' }),
  
  setListView: () => set({ viewType: 'list' }),
  
  toggleView: () => set((state) => ({
    viewType: state.viewType === 'grid' ? 'list' : 'grid'
  }))
}));