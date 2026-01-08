import apiClient from "@/api/apiClient";

export const acceptInvite = async (code) => {
  const response = await apiClient.post("/channel-members/invite/accept", null, {
    params: { code: code}
  })
  return response.data;
};