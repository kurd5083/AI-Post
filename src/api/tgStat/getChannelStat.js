import apiClient from "@/api/apiClient";

export const getChannelStat = async (channelId) => {
  const response = await apiClient.get("/tg-stat/channel-stat", {channelId});

  return response.data;
};
