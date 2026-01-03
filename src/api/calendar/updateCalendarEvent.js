import apiClient from "@/api/apiClient";

export const updateCalendarEvent = async (id, payload) => {
  const response = await apiClient.put(`/calendar/${id}`, payload);
  return response.data;
};