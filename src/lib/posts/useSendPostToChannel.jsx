import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendPostToChannel } from "@/api/posts/sendPostToChannel";

export const useSendPostToChannel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendPostToChannel,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", "calendar-events"]);
    },
  });
  
};
