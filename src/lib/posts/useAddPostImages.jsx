import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPostImages } from "@/api/posts/addPostImages";

export const useAddPostImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, images }) => addPostImages(postId, images),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
};