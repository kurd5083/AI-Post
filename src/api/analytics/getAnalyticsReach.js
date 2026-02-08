import apiClient from "@/api/apiClient";

export const getAnalyticsReach = async ({ channel_id, days, date_from, date_to }) => {
  const response = await apiClient.get(`/telescope-channels/${channel_id}/analytics/reach`, { params: { days, date_from, date_to }});
  console.log(response) 
  return response.data;
};
