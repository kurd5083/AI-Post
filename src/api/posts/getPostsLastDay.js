import apiClient from "@/api/apiClient";

export const getPostsLastDay = async (channel_id) => {
    console.log(channel_id, 'asdasd')
    const response = await apiClient.get(`/telescope-channels/${channel_id}/posts/last-24h`)
    return response.data
}