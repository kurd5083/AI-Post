import apiClient from "@/api/apiClient";

export const uploadMedia = async ({ files, url }) => {
  const formData = new FormData();

  if (files && files.length) {
    files.forEach(file => formData.append("files", file));
  }

  if (url) {
    formData.append("urls", url);
  }

  const response = await apiClient.post("/media-library/upload", formData);

  return response.data;
};
