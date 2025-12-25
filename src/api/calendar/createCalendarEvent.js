import apiClient from '@/api/apiClient';

export const createCalendarEvent = async (data) => {
  const response = await apiClient.post('/calendar', data);
  return response.data;
};
