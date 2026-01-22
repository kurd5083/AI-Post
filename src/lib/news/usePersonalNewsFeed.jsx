import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPersonalNewsFeed } from "@/api/news/createPersonalNewsFeed";

export const useCreatePersonalNewsFeed = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createPersonalNewsFeed(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["news"]);
    },
  });
};