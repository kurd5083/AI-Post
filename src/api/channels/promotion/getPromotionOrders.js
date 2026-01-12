import apiClient from "@/api/apiClient";

export const getPromotionOrders = async (filters) => {
  const response = await apiClient.get("/promotion-orders", {
    params: { 
      channelId: filters.channelId, 
      page: 1,
      limit: 50,
      orderType: filters.orderType,
      success: filters.success
    }
  });
  return response.data;
};
