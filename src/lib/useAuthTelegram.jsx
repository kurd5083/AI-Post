import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authTelegram } from "@/api/authTelegram";

export const useAuthTelegram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (telegramData) => authTelegram(telegramData),
    onSuccess: (res) => {
      console.log(res)
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.setItem("userId", res.id);

      queryClient.invalidateQueries(["user"]);
    },
  });
};
