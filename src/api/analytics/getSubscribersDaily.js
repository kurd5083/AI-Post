import apiClient from "@/api/apiClient";

export const getSubscribersDaily = async ({ channel_id, date_from, date_to }) => {
  const response = await apiClient.get(`/telescope-channels/${channel_id}/analytics/subscribers-daily`, { params: { date_from, date_to }});
  return response.data;
};
