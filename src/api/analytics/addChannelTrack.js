import apiClient from "@/api/apiClient";

export const addChannelTrack = async (channel) => {
  const response = await apiClient.post(`/telescope-channels/track`, { channel });
  return response.data;
};
