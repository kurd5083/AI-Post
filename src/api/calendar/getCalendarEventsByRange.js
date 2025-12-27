import apiClient from "@/api/apiClient";

export const getCalendarEventsByRange = async (channelId, startDate, endDate) => {
  const response = await apiClient.get(`/calendar/channel/${channelId}/range`, {params: { startDate, endDate }});
  return response.data;
};
