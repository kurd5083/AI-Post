import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/api/posts/getPosts";

export const useGetPosts = () => {
  const { data: posts, isPending: postsPending } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });

  return { posts, postsPending };
};
