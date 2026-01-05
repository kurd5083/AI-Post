import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/posts/createPost";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postData) => createPost(postData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
};