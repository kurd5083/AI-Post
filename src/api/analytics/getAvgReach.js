import apiClient from "@/api/apiClient";

export const getAvgReach = async ({ channelId, startDate, endDate, group}) => {
  const response = await apiClient.get("/tg-stat/avg-reach", { params: { channelId, startDate, endDate, group}});
  return response.data;
};
