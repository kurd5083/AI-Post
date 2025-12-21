import apiClient from "@/api/apiClient";

export const toggleChannelPosting = async (channelId) => {
  const response = await apiClient.post(
    `/api/v1/channels/${channelId}/posting/toggle`
  );
  return response.data;
};
