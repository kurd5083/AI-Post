import apiClient from "@/api/apiClient";

export const getChannelGlobalPrompt = async (channelId) => {
  const response = await apiClient.get(`/channels/${channelId}/global-promt`);
  return response.data;
};
