import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generatePost } from "@/api/posts/generatePost";

export const useGeneratePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (channelId) => generatePost(channelId),

        onSuccess: (data, channelId) => {
            queryClient.invalidateQueries([ "posts-by-channel", channelId ]);
        }
    });
};
