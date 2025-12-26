import apiClient from "@/api/apiClient";

export const getChannelMembers = async (channelName) => {
  const response = await apiClient.get(`/channel-members/${channelName}/users`);
  return response.data;
};