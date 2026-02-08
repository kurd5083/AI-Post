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
    console.log(selectedPostData) 
    const fetchAllHourly = async () => {
      const posts = await Promise.all(
        postsLastDay.posts.map(async (p) => {
          const hourly = await getViewsDynamics({ post_id: p.id });
          return {
            post_id: p.id,
            post_date: p.post_date,
            reposts: p.forwards || 0,
            total_er_percent: p.total_er_percent || 0,
            total_views: selectedPostData?.total_views || 0,
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
    const percentPoints = hourlyData.map(h => h.views_delta);
    const totalViews = selectedPostData.total_views ?? points.reduce((sum, v) => sum + v, 0);
    const percent = percentPoints.map(v => totalViews ? (v / totalViews) * 100 : 0);

    const labels = hourlyData.map(h => {
      const hour = h.time_label.replace('h', '').padStart(2, '0');
      return {
        short: `${hour}:00`,
        medium: `${hour}:00`,
        full: `${hour}:00 ч.`,
        total_views: selectedPostData.total_views,
        reposts: selectedPostData.reposts,
        total_er_percent: selectedPostData.total_er_percent,

      };
  });

  setDayData(points, labels, postsWithHourly, percent);
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
