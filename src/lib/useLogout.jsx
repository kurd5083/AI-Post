import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/api/logout";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");

      queryClient.clear();
    },
    onError: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");

      queryClient.clear();
    },
  });
};