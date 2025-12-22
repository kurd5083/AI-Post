import apiClient from "@/api/apiClient";

export const deleteChannel = async (channelId) => {
  const response = await apiClient.delete(`/channels/${channelId}`);
  return response.status === 204;
};