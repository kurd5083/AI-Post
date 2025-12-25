import apiClient from "@/api/apiClient";

export const getUserChannels = async () => {
  const response = await apiClient.get("/channels/user");
  return response.data;
};