import apiClient from './apiClient';

export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(`/users/${id}`);
    console.log(response)
    return response.data; 
  } catch (error) {
    console.error('Ошибка при получении пользователя:', error.message);
    throw error;
  }
};
