import apiClient from "@/api/apiClient";

export const addSubscribeChannel = async ({channel}) => {
    console.log(channel)
  const response = await apiClient.post("/channels/subscribe", { channel });
  return response.data;
};
