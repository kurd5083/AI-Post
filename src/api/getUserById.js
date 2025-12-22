import apiClient from './apiClient';

export const getUserById = async (id) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data; 
};
