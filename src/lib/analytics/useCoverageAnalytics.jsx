import { useEffect } from "react";
import { useGetAnalyticsReach } from "@/lib/analytics/useGetAnalyticsReach";
import { useAnalyticsStore } from "@/store/useAnalyticsStore";

const parseLocalDate = (dateStr) => {
  const [y, m, d] = dateStr.split("-");
  return new Date(y, m - 1, d);
};

export const useCoverageAnalytics = ({
  channel_id,
  averageCoverageAvgFilter,
  dateRanges
}) => {
  const {
    setAverageCoverageAvgData,
    setAverageCoverageErData,
    setAverageCoverageErr24Data,
    setAverageCoverageErrData
  } = useAnalyticsStore();

  const { analyticsReach } = useGetAnalyticsReach({
    channel_id,
    ...(averageCoverageAvgFilter === "24h"
      ? { days: 1 }
      : {
          date_from: dateRanges.averageCoverageAvgFilterRange.dateFromShort,
          date_to: dateRanges.averageCoverageAvgFilterRange.dateToShort
        })
  });

  useEffect(() => {
    if (!analyticsReach) return;

    const isHourly = averageCoverageAvgFilter === "24h";

    const source = isHourly
      ? analyticsReach.hourly
      : analyticsReach.daily;

    if (!source?.length) return;

    const pointsAvg = [];
    const pointsEr = [];
    const pointsErr24 = [];
    const pointsErr = [];
    const labels = [];

    source.forEach(item => {
      pointsAvg.push(item.avg_reach || 0);
      pointsEr.push(item.er_percent || 0);
      pointsErr24.push(item.err24_percent || 0);
      pointsErr.push(item.err_percent || 0);

      if (isHourly) {
        labels.push({
          short: item.time_label,
          medium: `${item.time_label}`,
          full: `${item.time_label} ч.`
        });
      } else {
        const d = parseLocalDate(item.date);

        labels.push({
          short: d.toLocaleDateString("ru-RU", { day: "numeric" }),
          medium: d.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "short"
          }),
          full: d.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "short",
            year: "numeric"
          })
        });
      }
    });

    setAverageCoverageAvgData(pointsAvg, labels);
    setAverageCoverageErData(pointsEr, labels);
    setAverageCoverageErr24Data(pointsErr24, labels);
    setAverageCoverageErrData(pointsErr, labels);
  }, [analyticsReach, averageCoverageAvgFilter]);
};
