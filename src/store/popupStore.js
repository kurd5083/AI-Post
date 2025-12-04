import { create } from 'zustand';

export const usePopupStore = create((set, get) => ({
    popup: null,
    savedScrollPosition: 0, 

    openPopup: () => {
        const scrollY = window.scrollY;
        set({ savedScrollPosition: scrollY });
        
        window.scrollTo({ top: 0, behavior: "smooth" });
        
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        
        if (window.innerWidth < 1400) {
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        }
        
        set({ popup: { status: true, content: 'settings', previousPage: [] } });
    },

    closePopup: () => {
        const { savedScrollPosition } = get();
        
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        
        if (savedScrollPosition > 0) {
            window.scrollTo(0, savedScrollPosition);
        }
        
        set({ 
            popup: null,
            savedScrollPosition: 0 
        });
    },

    changeContent: (popupData) => {
        const currentPopup = get().popup;

        set({
            popup: {
                status: true,
                content: popupData,
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