import { create } from 'zustand';

export const useMenuStore = create((set) => ({
    menu: false,

    openMenu: () => {
        document.body.style.overflowY = 'hidden';
        set({ menu: true });
    },

    closeMenu: () => {
        document.body.style.overflowY = 'scroll';
        set({ menu: false });
    },
}));