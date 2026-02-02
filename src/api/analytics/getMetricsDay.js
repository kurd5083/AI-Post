import apiClient from "@/api/apiClient";

export const getMetricsDay = async (channel_id) => {
  const response = await apiClient.get(`/telescope-channels/${channel_id}/metrics/24h`);
  return response.data;
};
