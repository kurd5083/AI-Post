import apiClient from "@/api/apiClient";

export const sendTestPost = async ({ title, summary, images, imagesUrls, url }) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("summary", summary);
  formData.append("url", url);
  images.forEach((image) => {
    formData.append("images", image);
  });
  console.log(images)
  if (imagesUrls && imagesUrls.length > 0) {
    const cleanedUrls = imagesUrls.map((imgUrl) => {
      try {
        const parsed = new URL(imgUrl);
        return parsed.pathname;
      } catch {
        return imgUrl.startsWith("/") ? imgUrl : `/${imgUrl}`;
      }
    });
    formData.append("imagesUrls", JSON.stringify(cleanedUrls));
  }

  const response = await apiClient.post("/channels/test-post", formData);

  return response.data;
};
