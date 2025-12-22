import apiClient from "@/api/apiClient";

export const removeChannelKeyword = async (channelId, keyword) => {
  const response = await apiClient.delete(`/channels/${channelId}/keywords/${keyword}`);
  return response.data;
};