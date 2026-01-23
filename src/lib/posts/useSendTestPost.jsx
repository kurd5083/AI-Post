import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendTestPost } from "@/api/posts/sendTestPost";

export const useSendTestPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postData) => sendTestPost(postData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["posts", "calendar-events"],
      });
    },
  });
};
