import { create } from "zustand";

const getTodayDateRange = () => {
  const today = new Date();

  const startISO = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0)
  ).toISOString();

  const endISO = new Date(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999)
  ).toISOString();

  return { startISO, endISO };
};

export const useCalendarStore = create((set) => ({
  selectedDate: getTodayDateRange(), // по умолчанию сегодня
  setSelectedDate: (dateRange) => set({ selectedDate: dateRange }),
}));
