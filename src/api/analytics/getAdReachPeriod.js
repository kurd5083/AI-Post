import apiClient from "@/api/apiClient";

export const getAdReachPeriod = async ({ channel_id, days, date_from, date_to }) => {
  const response = await apiClient.get(`/telescope-channels/${channel_id}/analytics/ad-reach-period`, { params: { days, date_from, date_to }});
  return response.data;
};
