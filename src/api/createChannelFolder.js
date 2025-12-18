import apiClient from "@/api/apiClient";

export const createChannelFolder = async (folderData) => {
  const response = await apiClient.post("/channels/folders", folderData);
  return response.data;
};

