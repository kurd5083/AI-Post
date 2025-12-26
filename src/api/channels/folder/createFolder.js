import apiClient from "@/api/apiClient";

export const createFolder = async (folderData) => {
  const response = await apiClient.post("/channels/folders", folderData);
  return response.data;
};

