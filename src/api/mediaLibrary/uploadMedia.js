import apiClient from "@/api/apiClient";

export const uploadMediaLibrary = async (files) => {
    console.log(files)
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await apiClient.post("/media-library/upload", formData);

  return response.data;
};
