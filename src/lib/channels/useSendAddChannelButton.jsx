import { useMutation } from "@tanstack/react-query";
import { sendAddChannelButton } from "@/api/channels/sendAddChannelButton";

export const useSendAddChannelButton = () => {
  return useMutation({
    mutationFn: () => sendAddChannelButton(),
    onSuccess: (data) => {
      console.log("Кнопка успешно отправлена:", data.message);
    },
    onError: (error) => {
      console.error("Ошибка при отправке кнопки:", error.message);
    },
  });
};
