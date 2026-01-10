import apiClient from "@/api/apiClient";

export const getPromotionOrders = async (filters) => {
    console.log(filters)
  const { data } = await apiClient.get("/promotion-orders", {filters});
  return data;
};
