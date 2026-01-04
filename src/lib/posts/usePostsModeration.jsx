import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsModeration } from "@/api/posts/postsModeration";

export const useApprovePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, channelId }) => postsModeration(postId, channelId),
    onSuccess: (data, variables) => {
      console.log(`Пост ${variables.postId} успешно одобрен`);
      queryClient.invalidateQueries(["posts"]);
    },
  });
};
