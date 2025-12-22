import apiClient from "@/api/apiClient";

export const updateChannelField = async ({ channelId, field }) => {
  const response = await apiClient.post(
    `/api/v1/channels/${channelId}/${field}/toggle`
  );
  return response.data;
};
