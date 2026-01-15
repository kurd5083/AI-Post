import apiClient from "@/api/apiClient";

export const getCalendarEventsByRange = async (startDate, endDate) => {
  console.log(startDate, endDate, 'startDate, endDate')
  const response = await apiClient.get(`/calendar/range`, {params: { startDate, endDate} });
  return response.data;
};
