import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authTelegram } from "@/api/authTelegram";
import { useAuthStore } from "@/store/authStore";

export const useAuthTelegram = () => {
  const queryClient = useQueryClient();
  const login = useAuthStore(state => state.login);

  return useMutation({
    mutationFn: (telegramData) => authTelegram(telegramData),
    onSuccess: (res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.setItem("userId", res.user.id);

      login(res.accessToken, res.refreshToken, res.user);

      queryClient.invalidateQueries(["user"]);
    },
  });
};
