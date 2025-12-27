import { create } from 'zustand';

export const usePopupStore = create((set, get) => ({
  popup: null,

  openPopup: (content = 'settings', view = 'popup', data = null) => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.body.style.overflow = "hidden";

    set({
      popup: {
        view,
        status: true,
        content,
        data,
        previousPage: [],
      },
    });
  },

  closePopup: () => {
    document.body.style.overflow = "";
    set({ popup: null });
  },

  changeContent: (content, view = 'popup', data = null) => {
    const currentPopup = get().popup;

    set({
      popup: {
        status: true,
        content,
        view: view ?? currentPopup?.view,
        data: data ?? currentPopup?.data,
        previousPage: currentPopup
          ? [...(currentPopup.previousPage || []), currentPopup]
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
        ...lastPage,
        previousPage: previousPages,
      },
    });
  },
}));
