import apiClient from "@/api/apiClient";

export const enableChannelPosting = async (channelId) => {
  const response = await apiClient.post(`/channels/${channelId}/posting/enable`);
  return response.data;
};

export const disableChannelPosting = async (channelId) => {
  const response = await apiClient.post(`/channels/${channelId}/posting/disable`);
  return response.data;
};