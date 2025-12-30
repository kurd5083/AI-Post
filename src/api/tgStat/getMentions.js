import apiClient from "@/api/apiClient";

export const getMentions = async (channelIds) => {
  console.log(channelIds.join(","), 'zzzzzzzz')
  console.log(localStorage.getItem('accessToken'));
  const response = await apiClient.get(`/tg-stat/mentions`, {
    params: {
      channelIds: "42,33,29,28,27,24,23"
    },
  });
  return response.data;
};
