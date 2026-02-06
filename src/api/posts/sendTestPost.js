import apiClient from "@/api/apiClient";

export const sendTestPost = async ({ title, summary, images, imagesUrls, url }) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("summary", summary);
  formData.append("url", url);
  images.forEach((image) => formData.append("images", image));
  formData.append("imagesUrls", JSON.stringify(imagesUrls));
  formData.append("parse_mode", "HTML");

  const response = await apiClient.post("/channels/test-post", formData);
  return response.data;
};
