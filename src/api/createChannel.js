import apiClient from "@/api/apiClient";

const newChannelData = {
  channelId: "@my_channel",
  name: "Мой канал",
  subscribersCount: 1000,
  avatarUrl: "https://t.me/i/channelpic/320/channel.jpg",
  workMode: "AUTOPOSTING",
  premoderationMinutes: 30,
  canPublishWithoutApproval: false,
  keywords: ["новости", "технологии", "наука"],
  stopWords: ["спам", "реклама"],
  includeSourceLink: true,
  disableMedia: false,
  preserveOriginalText: false,
  forcePosting: false,
  caption: "Подпишитесь на наш канал!",
  ownerTelegramId: 123456789,
  sources: [],
  theme: "IT",
  folderId: 1,
  autoApprovalEnabled: false
};

export const createChannel = async (channelData) => {
  const response = await apiClient.post("/channels", channelData);
  return response.data;
};

// import { useMutation } from "@tanstack/react-query";

// export const useCreateChannel = () => {
//   return useMutation({
//     mutationFn: createChannel,
//     onSuccess: (data) => {
//       console.log("Канал успешно создан:", data);
//     },
//     onError: (error) => {
//       console.error("Ошибка создания канала:", error.message);
//     },
//   });
// };
