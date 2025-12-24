import apiClient from "@/api/apiClient";

export const getChannelMembers = async (channelId) => {
  const response = await apiClient.get(`/channel-members/@kurd_nika/users`);
  return response.data;
};