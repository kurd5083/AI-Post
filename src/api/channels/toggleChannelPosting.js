import apiClient from "@/api/apiClient";

export const toggleChannelPosting = async (channelId) => {
  const response = await apiClient.post(`/channels/21/posting/toggle`, true);
  return response.data;
};
