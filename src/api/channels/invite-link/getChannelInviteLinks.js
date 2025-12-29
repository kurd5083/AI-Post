import apiClient from "@/api/apiClient";

export const getChannelInviteLinks = async (channelId) => {
  const response = await apiClient.get(`/channel-invite-links/channels/${channelId}`);
  return response.data;
};
