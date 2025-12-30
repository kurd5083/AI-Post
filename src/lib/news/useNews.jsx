import { useQuery } from "@tanstack/react-query";
import { getNews } from "@/api/news/getNews";

export const useNews = (filters) => {
  const { data: newsData, isLoading: newsLoding } = useQuery({
    queryKey: ["news", JSON.stringify(filters)],
    queryFn: () => getNews(filters),
    enabled: !!localStorage.getItem("accessToken"),
  });

  return { newsData, newsLoding };
};
