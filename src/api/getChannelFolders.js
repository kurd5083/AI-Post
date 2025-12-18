import apiClient from "./apiClient";

export const getChannelFolders = async (ownerTelegramId) => {
  const response = await apiClient.get(`/channels/folders/empty`, {
    params: { ownerTelegramId: ownerTelegramId },
  });
  return response.data;
};
