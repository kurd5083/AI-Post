import apiClient from "@/api/apiClient";

export const getMentions = async (channelIds) => {
  console.log(channelIds, 'zzzzzzzz')
  const response = await apiClient.get(`/tg-stat/mentions`, {channelIds: channelIds});
  return response.data;
};
