import apiClient from "@/api/apiClient";

export const uploadMediaLibrary = async (files) => {
    console.log(files)
  if (!files || files.length === 0) {
    throw new Error("Необходимо выбрать хотя бы один файл");
  }

  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const response = await apiClient.post("/media-library/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
