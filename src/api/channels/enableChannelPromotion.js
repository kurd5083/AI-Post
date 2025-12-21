import apiClient from '../apiClient';

export const enableChannelPromotion = async (channelId) => {
  const response = await apiClient.post(`/channels/${channelId}/promotion/enable`);

  return response.data;
};
