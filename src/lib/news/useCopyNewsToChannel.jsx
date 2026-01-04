import { useMutation, useQueryClient } from "@tanstack/react-query";
import { copyNewsToChannel } from "@/api/news/copyNewsToChannel";

export const useCopyNewsToChannel = () => {
  return useMutation({
    mutationFn: ({ id, data }) => copyNewsToChannel(id, data),
    onSuccess: (id) => {
      queryClient.invalidateQueries(["posts-by-channel"]);
    }
  });
};
