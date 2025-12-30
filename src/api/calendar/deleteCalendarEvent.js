import apiClient from "@/api/apiClient";

export const deleteCalendarEvent = async (id) => {
  const response = await apiClient.delete(`/calendar/${id}`);
  return response.data;
};