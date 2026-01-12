import apiClient from "@/api/apiClient";

export const toggleChannelSchedule = async (channelId) => {
  const response = await apiClient.post(`/channels/${channelId}/schedule/toggle`);
  return response.data;
};
