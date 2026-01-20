import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "@/api/user/register";
import { login as loginApi } from "@/api/user/login";
import { useAuthStore } from "@/store/authStore";

export const useAuthEmail = () => {
  const queryClient = useQueryClient();
  const login = useAuthStore(state => state.login);

  const registerMutation = useMutation({
    mutationFn: (data) => register(data),
    onSuccess: (res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.setItem("userId", res.user.id);

      login(res.accessToken, res.refreshToken, res.user);

      queryClient.invalidateQueries(["user"]);
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data) => loginApi(data),
    onSuccess: (res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.setItem("userId", res.user.id);

      login(res.accessToken, res.refreshToken, res.user);

      queryClient.invalidateQueries(["user"]);
    },
  });

  return {
    register: registerMutation.mutateAsync,
    login: loginMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    registerError: registerMutation.error,
    loginError: loginMutation.error,
  };
};

