import apiClient from "@/api/apiClient";

export const getPostsLastDay = async ({channel_id, date_from, date_to}) => {
    const response = await apiClient.get(`/telescope-channels/${channel_id}/posts/last-24h`, { params: { date_from, date_to }})
    return response.data
}