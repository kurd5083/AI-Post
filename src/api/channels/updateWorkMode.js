import apiClient from "@/api/apiClient";

export const updateWorkMode = async ({ channelId, workMode }) => {
  const body = { workMode };

  const response = await apiClient.patch(`/channels/${channelId}/work-mode`, workMode);
  return response.data;
};