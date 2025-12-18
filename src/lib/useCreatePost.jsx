import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/createPost";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      console.log("Пост успешно создан:", data);
      queryClient.invalidateQueries(["posts", 
        // data.channelId
    ]);
    },
    onError: (error) => {
      console.error("Ошибка при создании поста:", error);
    },
  });
};