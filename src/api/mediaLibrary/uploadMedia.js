import apiClient from "@/api/apiClient";

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

export const uploadMediaLibrary = async (files) => {
  const base64Files = await Promise.all(files.map(file => fileToBase64(file)));

  const response = await apiClient.post("/media-library/upload", {
    files: base64Files
  });

  return response.data;
};
