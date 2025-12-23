import { useQuery } from "@tanstack/react-query";
import { getNews } from "@/api/news/getNews";

export const useNews = (filter) => {
  const { data: newsData, isLoading: newsLoding } = useQuery({
    queryKey: ["news", filter],
    queryFn: () => getNews(filter),
    enabled: !!localStorage.getItem("accessToken"),
  });

  return { newsData, newsLoding };
};
