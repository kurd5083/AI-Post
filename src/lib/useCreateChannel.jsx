import { useMutation } from "@tanstack/react-query";
import { createChannel } from "@/api/createChannel";

export const useCreateChannel = () => {
  return useMutation({
    mutationFn: (channelData) => createChannel(channelData),
    onSuccess: (data) => {
      console.log("Канал успешно создан:", data);
    },
    onError: (error) => {
      console.error("Ошибка создания канала:", error.message);
    },
  });
};
