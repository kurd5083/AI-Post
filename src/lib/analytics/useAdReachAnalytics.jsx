import { useEffect } from "react";
import { useGetAdReachPeriod } from "@/lib/analytics/useGetAdReachPeriod";
import { useAnalyticsStore } from "@/store/useAnalyticsStore";

export const useAdReachAnalytics = ({ channel_id, adReachFilter, dateRanges }) => {
  const { setAdReachData } = useAnalyticsStore();

  const { adReachPeriod } = useGetAdReachPeriod({
    channel_id,
    ...(adReachFilter === "24h"
      ? {}
      : {
          date_from: dateRanges.adReachFilterRange.dateFromShort,
          date_to: dateRanges.adReachFilterRange.dateToShort
        })
  });

  useEffect(() => {
    if (!adReachPeriod) return;

    const source =
      adReachFilter === "24h"
        ? adReachPeriod.hourly
        : adReachPeriod.daily;

    if (!source?.length) return;

    const points = source.map(x => Number(x.total_ad_reach) || 0);

    const labels = source.map(x => ({
      short: x.time_label || x.date,
      full: x.time_label ? `${x.time_label} ч.` : x.date
    }));

    setAdReachData(points, labels);
  }, [adReachPeriod, adReachFilter]);
};
