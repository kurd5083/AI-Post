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
    console.log(base64Files)
   const testFiles = [
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...", // реальная Base64 строка
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."   // и так далее
];

    const response = await apiClient.post("/media-library/upload", {
      files: testFiles // тупо передаем массив строк
    });
//   const response = await apiClient.post("/media-library/upload", {
//     files: base64Files
//   });

  return response.data;
};
