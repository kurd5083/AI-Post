import apiClient from "@/api/apiClient";

export const getChannelStat = async (channelIds) => {
  const response = await apiClient.get("/tg-stat/channel-stat", {params: {
    channelIds: channelIds.join(",")
  }});
  return response.data;
};
