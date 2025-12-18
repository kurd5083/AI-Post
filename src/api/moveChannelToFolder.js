import apiClient from "@/api/apiClient";

export const moveChannelToFolder = async ({ folderId, channelId }) => {
    console.log(folderId, channelId)
    const response = await apiClient.post(`/channels/folders/${folderId}/move-channel`,{ channelId });
    return response.data;
};
