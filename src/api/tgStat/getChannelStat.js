import apiClient from "@/api/apiClient";

export const getChannelStat = async (channelId) => {
  const response = await apiClient.get("/tg-stat/channel-stat", {
    params: {
      channelId,
    },
  });

  return response.data;
};