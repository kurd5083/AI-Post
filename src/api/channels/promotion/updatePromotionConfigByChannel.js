import apiClient from "@/api/apiClient";

export const updatePromotionConfigByChannel = async ( channelId, payload ) => {
  const response = await apiClient.patch(`/promotion/config/channel/${channelId}`, payload);

  return response.data;
};
