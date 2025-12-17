import apiClient from "@/api/apiClient";

export const createChannelFolder = async (folderData) => {
  const response = await apiClient.post("/channels/folders", folderData);
  return response.data;
};

const newFolderData = {
  name: "Мои IT каналы",
  description: "Папка для IT и технологических каналов",
  color: "#3B82F6",
  icon: "📁",
  unifiedPostingSettings: false,
  unifiedScheduleSettings: false,
  individualPromotionSettings: true,
  ownerTelegramId: "123456789"
};