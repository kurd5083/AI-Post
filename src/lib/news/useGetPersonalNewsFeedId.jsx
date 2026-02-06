import { useQuery } from "@tanstack/react-query";
import { getPersonalNewsFeedId } from "@/api/news/getPersonalNewsFeedId";

export const useGetPersonalNewsFeedId = () => {
  const { data: newsFeed, isLoading: newsFeedLoading } = useQuery({
    queryKey: ["personalNewsFeed"],
    queryFn: () => getPersonalNewsFeedId(),
  });

  return { newsFeed, newsFeedLoading };
};
