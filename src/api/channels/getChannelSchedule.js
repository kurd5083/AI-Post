import apiClient from "@/api/apiClient";

export const getChannelSchedule = async (channelId) => {
  const response = await apiClient.get(`/channelschedule/channel/${channelId}`);
  return response.data;
};