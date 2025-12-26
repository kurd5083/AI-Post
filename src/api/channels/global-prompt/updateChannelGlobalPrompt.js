import apiClient from "@/api/apiClient";

export const updateChannelGlobalPrompt = async (channelId, value) => {
  const response = await apiClient.patch(`/channels/${channelId}/global-promt`, { value });
  return response.data;
};
