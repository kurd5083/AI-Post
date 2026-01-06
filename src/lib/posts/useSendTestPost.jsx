import { useMutation } from "@tanstack/react-query";
import { sendTestPost } from "@/api/posts/sendTestPost";

export const useSendTestPost = () => {
  return useMutation({
    mutationFn: (postData) => sendTestPost(postData),
    onSuccess: (data, postData) => {
      console.log("Тестовый пост успешно отправлен", postData);
    },
  });
};