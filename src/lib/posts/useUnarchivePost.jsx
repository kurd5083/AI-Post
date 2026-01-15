import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unarchivePost } from "@/api/posts/unarchivePost";
import { useNotificationStore } from "@/store/notificationStore";

export const useUnarchivePost = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (postId) => unarchivePost(postId),
    onSuccess: (data) => {
      addNotification("Пост успешно разархивирован", "success");
      // Обновляем кеш с постами — можно подставить нужный ключ
      queryClient.invalidateQueries(["posts-by-channel-archived"]);
      queryClient.invalidateQueries(["posts-by-channel"]); // если нужно обновить основной список
    },
    onError: (error) => {
      addNotification(error.message || "Ошибка разархивации поста", "error");
    },
  });
};
