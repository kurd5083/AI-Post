import apiClient from "@/api/apiClient";

export const getPendingModerationCount = async (channelId) => {
  const response = await apiClient.get("/posts/pending-moderation/count", {
    params: { channelId }
  });
  return response.data;
};
