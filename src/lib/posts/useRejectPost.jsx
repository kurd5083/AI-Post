import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectPost } from "@/api/posts/rejectPost";

export const useRejectPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, channelId }) => rejectPost(postId, channelId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
};