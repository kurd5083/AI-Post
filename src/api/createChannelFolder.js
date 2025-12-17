import apiClient from "@/api/apiClient";

export const createChannelFolder = async (folderData) => {
    console.log(folderData)
  const response = await apiClient.post("/channels/folders", folderData);
  return response.data;
};

