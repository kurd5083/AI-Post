import apiClient from "@/api/apiClient";

export const getChannelMembers = async (channelId) => {
  const response = await apiClient.get(`/channel-members/1626533444/users`);
  return response.data;
};