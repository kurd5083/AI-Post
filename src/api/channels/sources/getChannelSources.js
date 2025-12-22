import apiClient from "@/api/apiClient";

export const getChannelSources = async (channelId) => {
  const response = await apiClient.get(`channel-sources/channel/${channelId}`);
  return response.data;
};