import apiClient from "@/api/apiClient";

export const getAllSources = async () => {
  const response = await apiClient.get("/channel-sources");
  return response.data;
};
