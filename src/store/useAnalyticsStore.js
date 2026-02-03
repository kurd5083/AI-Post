import { create } from "zustand";

export const useAnalyticsStore = create((set) => ({
  dayPoints: [],
  dayLabels: [],
  dayPosts: [],
  subscriberPoints: [],
  subscriberLabels: [],
  adReachPoints: [],
  adReachLabels: [],
  postsByPeriodPoints: [],
  postsByPeriodLabels: [],
  averageCoveragePoints: [],
  averageCoverageLabels: [],

  dayFilter: "24h",
  subscriberFilter: "24h",
  adReachFilter: "24h",
  postsByPeriodFilter: "24h",
  averageCoverageFilter: "24h",

  setDayData: (points, labels, posts) => set({ dayPoints: points, dayLabels: labels, dayPosts: posts }),
  setSubscriberData: (points, labels) => set({ subscriberPoints: points, subscriberLabels: labels }),
  setAdReachData: (points, labels) => set({ adReachPoints: points, adReachLabels: labels }),
  setPostsByPeriodData: (points, labels) => set({ postsByPeriodPoints: points, postsByPeriodLabels: labels }),
  setAverageCoverageData: (points, labels) => set({ averageCoveragePoints: points, averageCoverageLabels: labels }),

  setDayFilter: (filter) => set({ dayFilter: filter }),
  setSubscriberFilter: (filter) => set({ subscriberFilter: filter }),
  setAdReachFilter: (filter) => set({ adReachFilter: filter }),
  setPostsByPeriodFilter: (filter) => set({ postsByPeriodFilter: filter }),
  setAverageCoverageFilter: (filter) => set({ averageCoverageFilter: filter }),
}));
