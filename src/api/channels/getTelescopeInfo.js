import apiClient from "@/api/apiClient";

export const getTelescopeInfo = async (channel_id) => {
  const response = await apiClient.get(`/telescope-channels/${channel_id}/info`);
  return response.data;
};
