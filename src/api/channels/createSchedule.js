import apiClient from "@/api/apiClient";

export const createSchedule = async (data) => {
    console.log(data)
  const response = await apiClient.post(`/channelschedule`, data);
  return response.data;
};