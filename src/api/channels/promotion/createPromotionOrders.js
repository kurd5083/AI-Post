import apiClient from "@/api/apiClient";

export const createPromotionOrders = async (channelId, orders) => {
  const response = await apiClient.post(`/promotion/views/orders`, {
    action: "add",
    channelId,
    orders: orders,
  });

  return response.data;
};