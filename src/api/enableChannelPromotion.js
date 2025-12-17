import apiClient from './apiClient';

export const enableChannelPromotion = async (channelId) => {
  if (!channelId) throw new Error("Не указан ID канала");

  const response = await apiClient.patch(`/channels/${channelId}/promotion/enable`);
  return response.data;
};
