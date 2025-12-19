import apiClient from "@/api/apiClient";

export const updateWorkMode = async ({ channelId, workMode, premoderationMinutes }) => {
  const body = { workMode };
  if (workMode === "PREMODERATION" && premoderationMinutes != null) {
    body.premoderationMinutes = premoderationMinutes;
  }

  const response = await apiClient.patch(`/channels/${channelId}/work-mode`, body);
  return response.data;
};