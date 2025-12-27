import apiClient from "@/api/apiClient";

export const getCalendarEventsByRange = async ({channelId, startDate, endDate}) => {
  console.log({channelId, startDate, endDate}, 'adsg')
  const response = await apiClient.get(`/calendar/channel/${channelId}/range`, { startDate, endDate });
  return response.data;
};
