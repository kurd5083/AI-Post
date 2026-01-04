import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "@/api/posts/updatePost";

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, postData }) => updatePost(postId, postData),
    onSuccess: (data) => {
      console.log("Пост успешно обновлён:", data);
      queryClient.invalidateQueries(["posts"]);
    },
  });
};