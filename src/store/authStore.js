import { create } from 'zustand';

export const useAuthStore = create((set, get) => {
  const token = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return {
    token,
    refreshToken,
    user,
    get isAuthenticated() {
      return !!get().token;
    },

    login: (t, r, u) => {
      localStorage.setItem("accessToken", t);
      localStorage.setItem("refreshToken", r);
      if(u) localStorage.setItem("user", JSON.stringify(u));
      set({ token: t, refreshToken: r, user: u });
    },

    logout: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      set({ token: null, refreshToken: null, user: null });
    },
  };
});
