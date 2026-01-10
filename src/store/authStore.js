import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
  token: null,
  user: null,

  get isAuthenticated() {
    return !!get().token;
  },

  login: (token, user = null) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
  
  setUser: (user) => set({ user }),
}));