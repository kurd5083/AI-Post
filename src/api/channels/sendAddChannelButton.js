import apiClient from "@/api/apiClient";

export const sendAddChannelButton = async () => {
  const response = await apiClient.post("/telegram/send-add-channel-button");
  return response.data;
};
