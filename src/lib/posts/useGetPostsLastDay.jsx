import { useQuery } from "@tanstack/react-query";
import { getPostsLastDay } from "@/api/posts/getPostsLastDay";

export const useGetPostsLastDay = ({channel_id, date_from, date_to}) => {
  const { data: postsLastDay, isPending: postsLastDayPending } = useQuery({
    queryKey: ["posts-last-day", channel_id, date_from, date_to],
    queryFn: () => getPostsLastDay({channel_id, date_from, date_to}),
    enabled: !!channel_id, 
  });

  return { postsLastDay, postsLastDayPending };
};
