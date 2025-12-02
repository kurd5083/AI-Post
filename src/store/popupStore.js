import { create } from 'zustand';

export const usePopupStore = create((set, get) => ({
    popup: null,

    openPopup: () => {
        set({ popup: { status: true, content: 'settings' } });
    },

    closePopup: () => {
        set({ popup: null });
    },
    changeContent: (popupData) => {
        set({ popup: { status: true, content: popupData } });
    },
}));