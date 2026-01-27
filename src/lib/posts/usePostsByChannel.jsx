import { useQuery } from "@tanstack/react-query";
import { getPostsByChannel } from "@/api/posts/getPostsByChannel";

export const usePostsByChannel = ({channelId}) => {
  const { data: posts, isPending: pendingPosts } = useQuery({
    queryKey: ["posts-by-channel", channelId],
    queryFn: () => getPostsByChannel(channelId),
    enabled: !!channelId, 
  });

  return { posts, pendingPosts };
};
