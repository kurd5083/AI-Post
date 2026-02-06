import { useEffect, useMemo, useState } from "react";
import { useGetPostsLastDay } from "@/lib/posts/useGetPostsLastDay";
import { useAnalyticsStore } from "@/store/useAnalyticsStore";
import { getViewsDynamics } from "../../api/analytics/getViewsDynamics";

export const usePostViewsDynamics = ({ channel_id, dayFilter, dateRanges }) => {
  const { setDayData } = useAnalyticsStore();

  const [selectedPostData, setSelectedPostData] = useState(null);
  const [postsWithHourly, setPostsWithHourly] = useState([]);

  const { postsLastDay } = useGetPostsLastDay({
    channel_id,
    ...(dayFilter === "24h"
      ? {}
      : {
          date_from: dateRanges.dayFilterRange.dateFromShort,
          date_to: dateRanges.dayFilterRange.dateToShort
        })
  });

  useEffect(() => {
    if (!postsLastDay?.posts?.length) return;

    const fetchAllHourly = async () => {
      const posts = await Promise.all(
        postsLastDay.posts.map(async (p) => {
          const hourly = await getViewsDynamics({ post_id: p.id });
          return {
            post_id: p.id,
            post_date: p.post_date,
            total_views: p.views,
            reposts: p.forwards || 0,
            total_er_percent: p.total_er_percent || 0,
            hourly: hourly || []
          };
        })
      );

      setPostsWithHourly(posts);
      setSelectedPostData(posts[0]);
    };

    fetchAllHourly();
  }, [postsLastDay]);

  useEffect(() => {
    if (!selectedPostData) return;

    const hourlyData = selectedPostData.hourly?.data || selectedPostData.hourly || [];
    const points = hourlyData.map(h => h.views);
    const labels = hourlyData.map(h => ({
      short: `${h.time_label}`,
      medium: `${h.time_label}`,
      full: `${h.time_label} ч.`
    }));

    setDayData(points, labels, postsWithHourly);
  }, [selectedPostData, postsWithHourly, setDayData]);

  const postOptions = useMemo(
    () =>
      postsLastDay?.posts?.map(p => ({
        id: p.id,
        label: `Пост #${p.id}`,
        forward: `${p.forwards}`,
        date: p.post_date,
        views: `${p.views}`
      })) || [],
    [postsLastDay]
  );

  const setSelectedPost = (postId) => {
    const post = postsWithHourly?.find(p => p.post_id === postId) || postsLastDay?.posts?.find(p => p.id === postId) || null;
    setSelectedPostData(post);
  };

  return {
    selectedPostData,
    setSelectedPost,
    postOptions,
    postsWithHourly,
  };
};
