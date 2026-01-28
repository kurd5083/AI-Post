import { useQuery } from "@tanstack/react-query";
import { getPostsLastDay } from "@/api/posts/getPostsLastDay";

export const useGetPostsLastDay = (channel_id) => {
  const { data: postsLastDay, isPending: postsLastDayPending } = useQuery({
    queryKey: ["posts-last-day", channel_id],
    queryFn: () => getPostsLastDay(channel_id),
    enabled: !!channel_id, 
  });

  return { postsLastDay, postsLastDayPending };
};
