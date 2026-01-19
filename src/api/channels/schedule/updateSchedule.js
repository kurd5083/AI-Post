import apiClient from "@/api/apiClient";

export const updateChannelSchedule = async (id, data) => {
  const response = await apiClient.patch(`/channelschedule/${id}`, data);
  return response.data;
};
