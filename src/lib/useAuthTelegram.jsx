import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authTelegram } from "@/api/authTelegram";

export const useAuthTelegram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (telegramData) => authTelegram(telegramData),
    onSuccess: (res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);

      queryClient.invalidateQueries(["user"]);
    },
  });
};
