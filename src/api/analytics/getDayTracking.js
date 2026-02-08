import apiClient from "@/api/apiClient";

export const getDayTracking = async ({ channel_id }) => {
  const response = await apiClient.get(`/telescope-channels/${channel_id}/posts/24h-tracking`);
  return response.data;
};
