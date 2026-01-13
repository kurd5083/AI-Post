import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePostTime } from "@/api/posts/updatePostTime";

export const useUpdatePostTime = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, channelId, publishedAt }) => updatePostTime({postId, channelId, publishedAt }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
};
