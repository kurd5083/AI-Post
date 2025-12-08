import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useSidebarStore = create(
  persist(
    (set, get) => ({
      activePage: 1,
      isSidebarVisible: true,

      setActivePage: (id) => set({ activePage: id }),

      hideSidebar: () => set({ isSidebarVisible: false }),

      showSidebar: () => set({ isSidebarVisible: true }),

      toggleSidebar: () => set((state) => ({ 
        isSidebarVisible: !state.isSidebarVisible 
      })),
    }),
    {
      name: 'sidebar-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);