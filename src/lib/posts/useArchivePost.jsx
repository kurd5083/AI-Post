import { useMutation, useQueryClient } from "@tanstack/react-query";
import { archivePost } from "@/api/posts/archivePost";
import { useNotificationStore } from "@/store/notificationStore";

export const useArchivePost = () => {
    const queryClient = useQueryClient();
    const { addNotification } = useNotificationStore();
    return useMutation({
        mutationFn: (postId) => archivePost(postId),
        onSuccess: (data) => {
            addNotification("Пост успешно перемещён в архив", "success");
            queryClient.invalidateQueries(["posts-by-channel-archived"]);
        },
        onError: (error) => {
            addNotification(error.message || "Ошибка архивирования поста", "error");
        },
    });
};