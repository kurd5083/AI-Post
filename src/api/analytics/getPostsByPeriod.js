import apiClient from "@/api/apiClient";

export const getPostsByPeriod = async ({ channel_id, date_from, date_to  }) => {
  const response = await apiClient.get(`/posts/channels/${channel_id}/by-period`, { params: { date_from, date_to }});
  return response.data;
};
