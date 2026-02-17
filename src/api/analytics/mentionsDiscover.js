import apiClient from "@/api/apiClient";

export const mentionsDiscover = async (channel_id) => {
  const response = await apiClient.post(`/telescope-channels/${channel_id}/mentions/discover`);
  return response.data;
};
