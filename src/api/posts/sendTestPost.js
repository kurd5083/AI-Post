import apiClient from "@/api/apiClient";

export const sendTestPost = async ({ title, summary, images, imagesUrls }) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("summary", summary);

  images.forEach((image) => {
    formData.append("images", image);
  });

  if (imagesUrls && imagesUrls.length > 0) {
    const relativeUrls = imagesUrls.map(url => {
      try {
        const parsed = new URL(url);
        return parsed.pathname; 
      } catch {
        return url; 
      }
    });

    formData.append("imagesUrls", JSON.stringify(relativeUrls));
  }

  const response = await apiClient.post("/channels/test-post", formData);

  return response.data;
};
