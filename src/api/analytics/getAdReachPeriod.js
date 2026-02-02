import apiClient from "@/api/apiClient";

export const getAdReachPeriod = async ({ channel_id, date_from, date_to }) => {
  const response = await apiClient.get(`/telescope-channels/${channel_id}/analytics/ad-reach-period`, { params: { date_from, date_to }});
  return response.data;
};
