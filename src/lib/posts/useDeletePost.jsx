import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/api/posts/deletePost";
import { useNotificationStore } from "@/store/notificationStore";

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (postId) => deletePost(postId),

    onSuccess: () => {
      queryClient.invalidateQueries(["posts-by-channel"]);
      queryClient.invalidateQueries(["posts-by-channel-archived"]);
      addNotification("Пост удалён", "delete")

    },
    onError: (err) =>
        addNotification(err?.message || "Ошибка удаления поста", "error"),
  });
};
