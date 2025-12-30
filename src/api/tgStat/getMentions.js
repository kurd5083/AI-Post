import apiClient from "@/api/apiClient";

export const getMentions = async (channelIds) => {
  console.log(channelIds.join(","), 'zzzzzzzz')
  const response = await apiClient.get(`/tg-stat/mentions`, params = {
    channelIds: channelIds.join(","),
  });
  return response.data;
};
