import apiClient from "@/api/apiClient";

export const getMentions = async (channelIds) => {
  const response = await apiClient.get(`/tg-stat/mentions`, {params: {
    channelIds: channelIds.join(","),
    channelId: 44
  }});
  return response.data;
};
