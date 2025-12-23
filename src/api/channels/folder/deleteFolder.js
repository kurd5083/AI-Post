import apiClient from "@/api/apiClient";

export const deleteFolder = async (folderId) => {
  const response = await apiClient.delete(`/channels/folders/${folderId}`);
  return response.status === 204;
};
