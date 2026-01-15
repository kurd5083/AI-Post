import { useQuery } from "@tanstack/react-query";
import { getPostsById } from "@/api/posts/getPostsById";

export const useGetPostsById = (id) => {
  const { data: postsId } = useQuery({
    queryKey: ["posts-id", id],
    queryFn: () => getPostsById(id),
    enabled: !!id, 
  });

  return { postsId };
};
