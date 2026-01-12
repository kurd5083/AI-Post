import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  token: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,

  init() {
    const t = localStorage.getItem("accessToken");
    const r = localStorage.getItem("refreshToken");
    const u = JSON.parse(localStorage.getItem("user") || "null");

    set({ 
      token: t,
      refreshToken: r,
      user: u,
      isAuthenticated: !!t
    });
  },

  login(t, r, u) {
    localStorage.setItem("accessToken", t);
    localStorage.setItem("refreshToken", r);
    if (u) localStorage.setItem("user", JSON.stringify(u));

    set({
      token: t,
      refreshToken: r,
      user: u,
      isAuthenticated: true
    });
  },

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    set({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false
    });
  }
}));
