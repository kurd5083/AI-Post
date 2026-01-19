import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/api/user/getUserById";

export const useUser = () => {
  const userId = localStorage.getItem("userId");

  const { data: user } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });

  return { user };
};
