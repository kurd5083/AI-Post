import apiClient from "@/api/apiClient";

export const createSchedule = async (data) => {
  const response = await apiClient.get(`/channelschedule`, data);
  return response.data;
};