import apiClient from "@/api/apiClient";

export const getViewsDynamics = async ({ post_id }) => {
  const response = await apiClient.get(`/posts/${post_id}/views-dynamics`);
  return response.data;
};
