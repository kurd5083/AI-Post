import apiClient from "@/api/apiClient";

export const testDrivePrompt = async ({ topic, promtManage, channelId }) => {
  const response = await apiClient.post("/prompt/test-drive", { topic, promtManage, channelId });
  return response.data;
};
