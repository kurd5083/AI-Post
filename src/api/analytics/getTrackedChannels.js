import apiClient from "@/api/apiClient";

export const getTrackedChannels = async () => {
  const response = await apiClient.get(`/tracked-channels`, {params: { limit: 10 }});
  return response.data;
};
