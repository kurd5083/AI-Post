import { useQuery } from "@tanstack/react-query";
import { getArchivedPosts } from "@/api/posts/getArchivedPosts";

export const useGetArchivedPosts = (channelId) => {
  const { data: postsArchived, isPending: archivedPending } = useQuery({
    queryKey: ["posts-by-channel-archived", channelId],
    queryFn: () => getArchivedPosts(channelId),
    enabled: !!channelId, 
  });

  return { postsArchived, archivedPending };
};
