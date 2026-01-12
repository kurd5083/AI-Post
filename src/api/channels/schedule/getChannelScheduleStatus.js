import apiClient from "@/api/apiClient";

export const getChannelScheduleStatus = async (channelId) => {
  const response = await apiClient.get(`/channels/${channelId}/schedule`);
  return response.data;
};
