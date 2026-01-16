import apiClient from "@/api/apiClient";

export const createPromotionOrder = async (data) => {
  const response = await apiClient.post("/promotion/orders", data);
  return response.data;
};