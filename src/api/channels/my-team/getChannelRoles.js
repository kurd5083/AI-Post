import apiClient from "@/api/apiClient";

export const getChannelRoles = async () => {
  const response = await apiClient.get("/channel-members/roles");
  return response.data;
};