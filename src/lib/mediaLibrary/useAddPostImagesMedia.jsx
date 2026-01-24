import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPostImagesMedia } from "@/api/mediaLibrary/addPostImagesMedia";

export const useAddPostImagesMedia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, images, imageUrl }) => addPostImagesMedia(postId, { images, imageUrl }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts", "images"]);
    },
  });
};
