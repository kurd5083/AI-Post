import apiClient from "@/api/apiClient";

export const createPromotionOrders = async (orders) => {
  const response = await apiClient.post(`/promotion/views/orders`, {
    action: "add",
    orders: orders,
  });

  return response.data;
};