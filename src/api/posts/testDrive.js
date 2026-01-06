import apiClient from "@/api/apiClient";

export const testDrivePrompt = async ({ promtManage, channelId }) => {
  const response = await apiClient.post("/prompt/test-drive", { promtManage, channelId });
  return response.data;
};
