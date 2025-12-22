import apiClient from "@/api/apiClient";

export const moveChannelToFolder = async ({ folderId, channelId, ownerTelegramId }) => {
    console.log(folderId, channelId)
    const response = await apiClient.post(`/channels/folders/${folderId}/move-channel`,{ channelId, ownerTelegramId });
    return response.data;
};
