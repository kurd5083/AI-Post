import apiClient from "@/api/apiClient";

export const getCalendarEventsByRange = async (startDate, endDate) => {
  const response = await apiClient.get(`/calendar/channel/range`, { startDate, endDate });
  return response.data;
};
