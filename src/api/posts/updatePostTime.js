import apiClient from "@/api/apiClient";

export const updatePostTime = async ({ postId, channelId, publishedAt }) => {
    const response = await apiClient.patch(`/posts/${postId}/publishedAt`, {
        publishedAt,
        channelId,
    });

    return response.data;
};