import { create } from 'zustand';

export const usePopupStore = create((set, get) => ({
    popup: null,

    openPopup: (content = 'settings', view = 'popup') => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        document.body.style.overflow = "hidden";
        set({ 
            popup: { 
                view: view,
                status: true, 
                content: content, 
                previousPage: [] 
            } 
        });
    },

    closePopup: () => {
        document.body.style.overflow = "";
        set({ popup: null });
    },

    changeContent: (popupData, popupName, popupText) => {
        const currentPopup = get().popup;

        set({
            popup: {
                status: true,
                content: popupData,
                name: popupName,
                text: popupText,
                previousPage: currentPopup
                    ? [...(currentPopup.previousPage || []), currentPopup.content]
                    : [],
            },
        });
    },

    goBack: () => {
        const currentPopup = get().popup;
        if (!currentPopup || !currentPopup.previousPage?.length) return;

        const previousPages = [...currentPopup.previousPage];
        const lastPage = previousPages.pop();

        set({
            popup: {
                status: true,
                content: lastPage,
                previousPage: previousPages,
            },
        });
    },
}));
