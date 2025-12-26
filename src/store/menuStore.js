import { create } from 'zustand';
import { usePopupStore } from "@/store/popupStore"

export const useMenuStore = create((set) => ({
    menu: false,

    openMenu: () => {
        document.body.style.overflowY = 'hidden';
        set({ menu: true });
    },

    closeMenu: () => {
        const popupState = usePopupStore.getState();
        
        set({ menu: false });
        
        if (!popupState.popup) {
            document.body.style.overflowY = 'scroll';
        }
    },
}));