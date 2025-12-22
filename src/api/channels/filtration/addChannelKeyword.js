import apiClient from "@/api/apiClient";

export const addChannelKeyword = async (channelId, keyword) => {
  const response = await apiClient.post(`/channels/${channelId}/keywords`, { keyword });
  return response.data;
};