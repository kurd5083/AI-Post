import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostImage } from "@/api/posts/deletePostImage";

export const useDeletePostImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, imageIndex }) => deletePostImage(postId, imageIndex),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
};