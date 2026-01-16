import apiClient from "@/api/apiClient";

export const getPromotionServices = async (channelId) => {
  const response = await apiClient.get("/promotion/services", {
    params: { channelId: 44 },
  });

  return response.data;
};