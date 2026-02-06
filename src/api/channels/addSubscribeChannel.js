import apiClient from "@/api/apiClient";

export const addSubscribeChannel = async ({channel}) => {
  const response = await apiClient.post("/channels/subscribe", { channel });
  return response.data;
};
