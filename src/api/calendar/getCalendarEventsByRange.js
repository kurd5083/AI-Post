import apiClient from "@/api/apiClient";

export const getCalendarEventsByRange = async (startDate, endDate) => {
  console.log(startDate, endDate)
  const response = await apiClient.get(`/calendar/range`, { startDate:'2025-12-21T00:00:00Z', endDate: '2025-12-29T23:59:59Z' });
  return response.data;
};
