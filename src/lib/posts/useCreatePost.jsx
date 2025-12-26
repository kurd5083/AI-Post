import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/posts/createPost";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postData) => createPost(postData),
    onSuccess: (data) => {
      console.log("Пост успешно создан:", data);
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.error("Ошибка при создании поста:", error);
    },
  });
};