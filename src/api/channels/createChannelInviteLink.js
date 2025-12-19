import apiClient from "@/api/apiClient";

export const createChannelInviteLink = async (data) => {
  const response = await apiClient.post(`/channel-invite-links/channels/${channelId}`, id, data);
  return response.data;
};
