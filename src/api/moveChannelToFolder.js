import apiClient from "@/api/apiClient";

export const moveChannelToFolder = async ({ folderId, channelId}) => {
    const response = await apiClient.post(`/channels/folders/${folderId}/move-channel`,{ channelId });
    return response.data;
};
