import apiClient from "@/api/apiClient";

export const getChannelPromotionConfig = async (channelId) => {
  const response = await apiClient.get(`/promotion/config/channel/${channelId}`);
  return response.data;
};
