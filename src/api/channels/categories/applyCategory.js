import apiClient from "@/api/apiClient";

export const applyCategoryToChannel = async (channelId, category) => {
  const response = await apiClient.post("/channel-sources/categories/apply", { channelId, category });
  return response.data;
};