import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/posts/createPost";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      console.log("Пост успешно создан:", data);
      // Если используешь кэш для списка постов, можно сразу обновить
      queryClient.invalidateQueries(["posts", 
        // data.channelId
    ]);
    },
    onError: (error) => {
      console.error("Ошибка при создании поста:", error);
    },
  });
};