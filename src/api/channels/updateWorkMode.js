import apiClient from "@/api/apiClient";

export const updateWorkMode = async ({ channelId }) => {
  const response = await apiClient.patch(`/channels/${channelId}/work-mode`);
  return response.data;
};