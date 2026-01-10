import apiClient from "@/api/apiClient";

export const updateChannelMemberRole = async (channelId, memberTelegramId, role) => {
  const response = await apiClient.put(`/channel-members/${channelId}/member/${memberTelegramId}/role`, { role });
  return response.data;
};