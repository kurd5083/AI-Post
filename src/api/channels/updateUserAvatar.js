import apiClient from "@/api/apiClient";

export const updateUserAvatar = async (id, avatarUrl) => {
    console.log(avatarUrl, 'avatarUrl')
  const { data } = await apiClient.patch(`/users/${id}/avatar`, {avatarUrl});
  return data;
};
