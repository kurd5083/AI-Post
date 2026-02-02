import { create } from "zustand";

export const useStatisticsStore = create((set) => ({
  dayPoints: [],
  dayLabels: [],
  subscriberPoints: [],
  subscriberLabels: [],
  adReachPoints: [],
  adReachLabels: [],
  postsByPeriodPoints: [],
  postsByPeriodLabels: [],
  averageCoveragePoints: [],
  averageCoverageLabels: [],
  
  setDayData: (points, labels) => set({ dayPoints: points, dayLabels: labels }),
  setSubscriberData: (points, labels) => set({ subscriberPoints: points, subscriberLabels: labels }),
  setAdReachData: (points, labels) => set({ adReachPoints: points, adReachLabels: labels }),
  setPostsByPeriodData: (points, labels) => set({ postsByPeriodPoints: points, postsByPeriodLabels: labels }),
  setAverageCoverageData: (points, labels) => set({ averageCoveragePoints: points, averageCoverageLabels: labels }),
}));