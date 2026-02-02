import apiClient from "@/api/apiClient";

export const getAnalyticsReach = async ({ channel_id, date_from, date_to }) => {
  const response = await apiClient.get(`/telescope-channels/${channel_id}/analytics/reach`, { params: { date_from, date_to }});
  return response.data;
};
