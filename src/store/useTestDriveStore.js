import { create } from "zustand";
import { testDrivePrompt } from "@/api/posts/testDrive";
import { useNotificationStore } from "@/store/notificationStore";

export const useTestDriveStore = create((set, get) => ({
  results: {},
  progress: {},
  testPending: {},

  runTestDrive: async (channelId, prompt) => {
    const notify = useNotificationStore.getState().addNotification;
    if (!prompt?.trim()) return notify("Введите промпт для тестирования", "info");

    set(state => ({
      progress: { ...state.progress, [channelId]: 0 },
      testPending: { ...state.testPending, [channelId]: true }
    }));

    const interval = setInterval(() => {
      const current = get().progress[channelId] ?? 0;
      get().setProgress(channelId, Math.min(current + Math.floor(Math.random() * 10), 90));
    }, 500);

    try {
      const data = await testDrivePrompt({ promtManage: prompt, channelId }); 
      get().setProgress(channelId, 100);
      get().setResult(channelId, data);
      notify("Тест успешно выполнен", "success");

      setTimeout(() => get().resetProgress(channelId), 500);
    } catch (err) {
      get().setProgress(channelId, 0);
      notify(err?.message || "Ошибка при тестировании промпта", "error");
    } finally {
      set(state => ({
        testPending: { ...state.testPending, [channelId]: false }
      }));
    }
  },

  setResult: (channelId, data) =>
    set(state => ({ results: { ...state.results, [channelId]: data } })),

  setProgress: (channelId, value) =>
    set(state => ({ progress: { ...state.progress, [channelId]: value } })),

  resetProgress: (channelId) =>
    set(state => {
      const next = { ...state.progress };
      delete next[channelId];
      return { progress: next };
    }),
}));