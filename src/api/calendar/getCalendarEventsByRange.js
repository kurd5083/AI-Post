import apiClient from "@/api/apiClient";

export const getCalendarEventsByRange = async (startDate, endDate) => {
  const response = await apiClient.get(`/calendar/range`, { startDate, endDate });
  return response.data;
};
