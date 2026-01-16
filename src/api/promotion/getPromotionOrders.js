import apiClient from "@/api/apiClient";

export const getPromotionOrders = async () => {
  const response = await apiClient.get("/promotion-orders/all");
  return response.data;
};