import apiClient from "@/api/apiClient";

export const getMentions = async (channelIds, limit) => {
  const response = await apiClient.get(`/tg-stat/mentions`, {params: {
    channelIds: channelIds.join(","),
    limit
  }});
  return response.data;
};
