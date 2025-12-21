import apiClient from "@/api/apiClient";

export const getChannelById = async (channelId) => {
  const response = await apiClient.get(`/channels/${channelId}`);
  return response.data;
};