import { useEffect } from "react";
import { useGetPostsByPeriod } from "@/lib/analytics/useGetPostsByPeriod";
import { useAnalyticsStore } from "@/store/useAnalyticsStore";

export const usePostsByPeriodAnalytics = ({ channel_id, postsByPeriodFilter, dateRanges }) => {
  const { setPostsByPeriodData } = useAnalyticsStore();

  const { postsByPeriod } = useGetPostsByPeriod({
    channel_id
  });

  useEffect(() => {
    if (!postsByPeriod?.data) return;

    const points = postsByPeriod.data.map(p => p.posts_count || 0);

    const labels = postsByPeriod.data.map(p => ({
      short: p.date
    }));

    setPostsByPeriodData(points, labels);
  }, [postsByPeriod]);
};
