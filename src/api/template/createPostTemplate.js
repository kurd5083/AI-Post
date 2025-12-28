import apiClient from "@/api/apiClient";

export const createPostTemplate = async (dataToSend) => {
    console.log(dataToSend, 'asgahd')
  const response = await apiClient.post("/post-templates", dataToSend);
  return response.data;
};
