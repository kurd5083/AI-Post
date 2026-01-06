import apiClient from "@/api/apiClient";

export const sendTestPost = async ({ title, summary = "", imagesUrls = [] }) => {
  const response = await apiClient.post("/channels/test-post", { title, summary, imagesUrls });
  return response.data;
};