import apiClient from "@/api/apiClient";

export const createBoostOrder = async (data) => {
  const response = await apiClient.post("/promotion/boost/orders", data);
  return response.data;
};
