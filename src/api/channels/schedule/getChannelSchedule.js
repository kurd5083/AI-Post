import apiClient from "@/api/apiClient";

export const getChannelSchedule = async (channelId) => {
  const response = await apiClient.get(`/channels/${channelId}/schedule`);
  return response.data;
};
