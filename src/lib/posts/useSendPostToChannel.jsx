import { useMutation } from "@tanstack/react-query";
import { sendPostToChannel } from "@/api/posts/sendPostToChannel";

export const useSendPostToChannel = () => {
  return useMutation({
    mutationFn: sendPostToChannel,
    onSuccess: (data) => {
      console.log("Пост отправлен:", data);
    },
  });
};
