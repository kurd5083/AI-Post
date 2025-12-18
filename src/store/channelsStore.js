import { create } from "zustand";

export const useChannelsStore = create((set) => ({
  selectedFolderId: null, 
  selectedChannels: [],
  setSelectedFolder: (folderId, channels) =>
    set({ selectedFolderId: folderId, selectedChannels: channels }),
}));
