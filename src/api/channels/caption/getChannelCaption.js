import apiClient from "@/api/apiClient";

export const getChannelCaption = async (channelId) => {
  const response = await apiClient.get(`/channels/${channelId}/caption`);
  return response.data;
};