import apiClient from "@/api/apiClient";

export const removeChannelMember = async (channelId, memberTelegramId) => {
  const response = await apiClient.delete(`/channel-members/${channelId}/member/${memberTelegramId}`);
  return response.data;
};
