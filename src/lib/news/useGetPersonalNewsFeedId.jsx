import { useQuery } from "@tanstack/react-query";
import { getPersonalNewsFeedId } from "@/api/news/getPersonalNewsFeedId";

export const useGetPersonalNewsFeedId = (id) => {
  const { data: newsFeed, isLoading: newsFeedLoading } = useQuery({
    queryKey: ["personalNewsFeed"],
    queryFn: () => getPersonalNewsFeedId(id),
  });

  return { newsFeed, newsFeedLoading };
};
