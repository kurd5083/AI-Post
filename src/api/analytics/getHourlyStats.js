import apiClient from "@/api/apiClient";

export const getHourlyStats = async (channel_id) => {
  const response = await apiClient.get(`/telescope-channels/${channel_id}/posts/hourly-stats`);
  return response.data;
};
