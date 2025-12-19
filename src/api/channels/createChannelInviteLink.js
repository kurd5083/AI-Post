import apiClient from "@/api/apiClient";

export const createChannelInviteLink = async (channelId, data) => {
    console.log(channelId, data)
  const response = await apiClient.post(`/channel-invite-links/channels/${channelId}`, data);
  return response.data;
};
