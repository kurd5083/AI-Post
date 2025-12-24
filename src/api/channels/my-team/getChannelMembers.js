import apiClient from "@/api/apiClient";

export const getChannelMembers = async (channelId) => {
  const response = await apiClient.get(`/channel-members/${channelId}/users`);
  return response.data;
};