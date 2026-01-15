import { create } from "zustand";

const generateWeek = (date) => {
  const weekStart = new Date(date);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // начало недели (вс)
  return Array.from({ length: 7 }, (_, i) => new Date(weekStart.getTime() + i * 86400000));
};

export const useCalendarPopupStore = create((set) => {
  const today = new Date();

  return {
    currentDate: today,
    selectedDate: today,
    currentWeek: generateWeek(today),

    setCurrentDate: (date) =>
      set(() => ({
        currentDate: date,
        currentWeek: generateWeek(date),
      })),

    setSelectedDate: (date) =>
      set((state) => {
        let newState = { selectedDate: date };
        const { currentWeek } = state;

        if (date < currentWeek[0] || date > currentWeek[6]) {
          newState.currentDate = date;
          newState.currentWeek = generateWeek(date);
        }

        return newState;
      }),

    changeWeek: (dir) =>
      set((state) => {
        const d = new Date(state.currentDate);
        d.setDate(d.getDate() + dir * 7);
        return {
          currentDate: d,
          currentWeek: generateWeek(d),
        };
      }),

    syncDate: (date) =>
      set((state) => {
        let newState = { selectedDate: date };
        const { currentWeek } = state;

        if (date < currentWeek[0] || date > currentWeek[6]) {
          newState.currentDate = date;
          newState.currentWeek = generateWeek(date);
        }

        return newState;
      }),
  };
});
