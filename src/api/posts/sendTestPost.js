import apiClient from "@/api/apiClient";

export const sendTestPost = async ({ title, summary, images, imagesUrls, url }) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("summary", summary);
  formData.append("url", url);
  images.forEach((image) => {
    formData.append("images", image);
  });
  console.log(imagesUrls)

 if (imagesUrls && imagesUrls.length > 0) {
  const fullUrls = imagesUrls.map(url => {
    try {
      const parsed = new URL(url);
      return parsed.href; // возвращаем полную ссылку
    } catch {
      return url; // если невалидная ссылка — оставляем как есть
    }
  });

  formData.append("imagesUrls", JSON.stringify(fullUrls));
}


  const response = await apiClient.post("/channels/test-post", formData);

  return response.data;
};
