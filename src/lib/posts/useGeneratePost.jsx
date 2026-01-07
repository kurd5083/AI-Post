import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generatePost } from "@/api/posts/generatePost";

export const useGeneratePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channelId }) => generatePost(channelId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["posts-by-channel", variables.channelId]);
    },
  });
};
