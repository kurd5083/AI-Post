import apiClient from "@/api/apiClient";

export const searchPexelsPhotos = async (params) => {
    console.log(params)
  const response = await apiClient.get("/pexels-api/search", {params});

  return response.data;
};
