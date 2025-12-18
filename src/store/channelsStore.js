import { create } from "zustand";

export const useChannelsStore = create((set, get) => ({
  selectedFolderId: null,
  selectedChannels: [],
  initChannels: (channels) => {
    if (get().selectedFolderId === null) {
      set({
        selectedFolderId: null,
        selectedChannels: channels.channelsWithoutFolder || [],
      });
    }
  },
  setSelectedFolder: (folderId, channels) =>
    set({ selectedFolderId: folderId, selectedChannels: channels }),
}));
