import apiClient from "@/api/apiClient";

export const updateUserAvatar = async (id, avatarUrl) => {
  const { data } = await apiClient.patch(`/users/${id}/avatar`, {avatarUrl});
  return data;
};
