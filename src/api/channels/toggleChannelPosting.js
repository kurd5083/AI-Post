import apiClient from "@/api/apiClient";

export const toggleChannelPosting = async (channelId) => {
  const response = await apiClient.post(`/channels/${channelId}/posting/toggle`, {posting: true});
  return response.data;
};
