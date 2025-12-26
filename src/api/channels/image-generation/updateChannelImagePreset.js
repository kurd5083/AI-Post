import apiClient from "@/api/apiClient";

export const updateChannelImagePreset = async (channelId, presetId) => {
  const response = await apiClient.put(`/image-generation/channels/${channelId}/preset`, { presetId });
  return response.data;
};