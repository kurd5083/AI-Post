import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

import BtnBase from "@/shared/BtnBase";
import CustomSelectFour from "@/shared/CustomSelectFour";
import DayBarChart from "@/components/Analytics/DayBarChart";
import LineChart from "@/components/Analytics/LineChart";
import PostStatsDetails from "@/components/Analytics/PostStatsDetails";

import { useGetSubscribersDaily } from "@/lib/analytics/useGetSubscribersDaily";
import { useGetDayTracking } from "@/lib/analytics/useGetDayTracking";
import { useGetAdReachPeriod } from "@/lib/analytics/useGetAdReachPeriod";
import { useGetPostsByPeriod } from "@/lib/analytics/useGetPostsByPeriod";
import { useGetAnalyticsReach } from "@/lib/analytics/useGetAnalyticsReach";
import useResolution from "@/lib/useResolution";

import { useStatisticsStore } from "@/store/statisticsStore";
import { usePopupStore } from "@/store/popupStore";

const statisticsData = [
  { title: "Подписчики", mainSubValue: "Всего", content: 'subscriber_growth' },
  { title: "Подписки / Отписки за 24ч", mainSubValue: "Итого", content: 'subscriptions_day' },
  { title: "Анализ просмотров", mainSubValue: "Просмотры", content: 'dynamics_posts' },
  { title: "/ Рекламный", mainSubValue: "За сутки", content: 'average_advertising' },
  { title: "Публикации", mainSubValue: "Всего", content: 'publications_analytics' },
  { title: "1 публикации", mainSubValue: "За сутки", content: 'average_coverage' },
];

const StatisticsTab = ({ channel_id, dateFromStr, dateToStr, dateFromShort, dateToShort, filter }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const { isSmall } = useResolution(768);
  const { openPopup } = usePopupStore();

  const {
    dayPoints, dayLabels,
    subscriberPoints, subscriberLabels,
    adReachPoints, adReachLabels,
    postsByPeriodPoints, postsByPeriodLabels,
    averageCoveragePoints, averageCoverageLabels,
    setDayData,
    setSubscriberData,
    setAdReachData,
    setPostsByPeriodData,
    setAverageCoverageData,
  } = useStatisticsStore();

  const { dayTracking } = useGetDayTracking(channel_id);
  const { postsByPeriod } = useGetPostsByPeriod({ channel_id, date_from: dateFromStr, date_to: dateToStr });
  const { subscribersDaily } = useGetSubscribersDaily({ channel_id, date_from: dateFromShort, date_to: dateToShort });
  const { adReachPeriod } = useGetAdReachPeriod({ channel_id, date_from: dateFromShort, date_to: dateToShort });
  const { analyticsReach } = useGetAnalyticsReach({ channel_id, date_from: dateFromShort, date_to: dateToShort });

  const sortedPostsByPeriod = useMemo(() => 
    postsByPeriod?.data?.slice()?.sort((a,b) => new Date(a.date) - new Date(b.date)) || [],
    [postsByPeriod]
  );

  useEffect(() => {
    if (selectedPost === null && dayTracking?.posts?.length) {
      setSelectedPost(dayTracking.posts[0].post_id);
    }
  }, [dayTracking, selectedPost]);

  const selectedPostData = useMemo(() => {
    return dayTracking?.posts?.find(p => p.post_id === selectedPost) || dayTracking?.posts?.[0];
  }, [dayTracking, selectedPost]);
  console.log(selectedPostData)

  const dayChartData = useMemo(() => {
    if (!selectedPostData?.hourly?.length) return null;
    const points = selectedPostData.hourly.map(h => h.views);
    const labels = selectedPostData.hourly.map((h,i) => ({
      short: `${i}`,
      full: new Date(h.time || `2026-01-01T${i}:00:00`).toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"})
    }));
    return { points, labels };
  }, [selectedPostData?.hourly]);

  useEffect(() => {
    if (dayChartData) setDayData(dayChartData.points, dayChartData.labels);
  }, [dayChartData, setDayData]);

  const subscriberChartData = useMemo(() => {
    if (!subscribersDaily?.daily_data?.length) return null;

    const points = subscribersDaily.daily_data.map(d => d.subscriber_count);

    const labels = subscribersDaily.daily_data.map(d => {
      const dateObj = new Date(d.date);
      return { 
        short: dateObj.toLocaleDateString("ru-RU", { day: "numeric" }),
        full: dateObj.toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" }),
        delta: d.delta || 0,
        joined: d.joined || 0,
        left: d.left || 0
      };
    });

    return { points, labels };
  }, [subscribersDaily]);

  useEffect(() => {
    if (subscriberChartData) {
      setSubscriberData(subscriberChartData.points, subscriberChartData.labels);
    }
  }, [subscriberChartData, setSubscriberData]);
  const adReachChartData = useMemo(() => {
    if (!adReachPeriod?.daily?.length) return null;
    const numericFilter = Number(filter) || 1;
    const points = adReachPeriod.daily.map(d => (Number(d.total_ad_reach) || 0) * numericFilter);
    const labels = adReachPeriod.daily.map(d => {
      const dateObj = new Date(d.date);
      return { 
        short: dateObj.toLocaleDateString("ru-RU",{day:"numeric"}), 
        full: dateObj.toLocaleDateString("ru-RU",{day:"numeric",month:"short",year:"numeric"}) 
      };
    });
    return { points, labels };
  }, [adReachPeriod, filter]);

  useEffect(() => {
    if (adReachChartData) setAdReachData(adReachChartData.points, adReachChartData.labels);
  }, [adReachChartData, setAdReachData]);

  const postsChartData = useMemo(() => {
    if (!sortedPostsByPeriod.length) return null;
    const points = sortedPostsByPeriod.map(p => p.posts_count);
    const labels = sortedPostsByPeriod.map(p => {
      const dateObj = new Date(p.date);
      return { 
        short: dateObj.toLocaleDateString("ru-RU",{day:"numeric"}), 
        full: dateObj.toLocaleDateString("ru-RU",{day:"numeric",month:"short",year:"numeric"}) 
      };
    });
    return { points, labels };
  }, [sortedPostsByPeriod]);

  useEffect(() => {
    if (postsChartData) setPostsByPeriodData(postsChartData.points, postsChartData.labels);
  }, [postsChartData, setPostsByPeriodData]);

  const averageCoverageChartData = useMemo(() => {
    if (!analyticsReach?.daily?.length) return null;
    const points = analyticsReach.daily.map(d => d.avg_reach || 0);
    const labels = analyticsReach.daily.map(d => {
      const dateObj = new Date(d.date);
      return { 
        short: dateObj.toLocaleDateString("ru-RU",{day:"numeric"}), 
        full: dateObj.toLocaleDateString("ru-RU",{day:"numeric",month:"short",year:"numeric"}) 
      };
    });
    return { points, labels };
  }, [analyticsReach]);

  useEffect(() => {
    if (averageCoverageChartData) setAverageCoverageData(averageCoverageChartData.points, averageCoverageChartData.labels);
  }, [averageCoverageChartData, setAverageCoverageData]);

  const handleChangePost = (value) => setSelectedPost(value);

  const postOptions = useMemo(() => 
    dayTracking?.posts?.map(post => ({
      id: post.post_id,
      label: `Пост #${post.post_id}`,
      date: new Date(post.post_date),
      views: post.total_views,
      forward: post.total_forwards,
    })) || [],
    [dayTracking]
  );

  return (
    <StatisticsContainer>
      {statisticsData.map((item, index) => (
        <StatisticsItem key={index}>
          <ItemLeft>
            <ItemTitle>
              {item.content === "average_advertising" || item.content === "average_coverage" ? (
                <><p style={{ color: "#336CFF" }}>Средний охват</p>{item.title}</>
              ) : item.title}
            </ItemTitle>
            <StatsCardMainValue>
              {item.content === "publications_analytics" ? (
                sortedPostsByPeriod?.reduce((sum, p) => sum + (p.posts_count || 0), 0)
              ) : item.content === "subscriber_growth" ? (
                subscribersDaily?.current_subscribers || 0
              ) : item.content === "dynamics_posts" && selectedPostData ? (
                <>
                  <span>Пост #{selectedPostData.post_id}</span>
                  {selectedPostData.total_views || 0}
                </>
              ) : item.content === "average_advertising" ? (
                adReachPeriod?.by_day?.total_ad_reach || 0
              ) : item.content === "average_coverage" ? (
                analyticsReach?.daily?.[0]?.avg_reach || 0
              ) : 1}
              {item.mainSubValue && <span>{item.mainSubValue}</span>}
            </StatsCardMainValue>
            <StatsCardDetails>
              {item.content === "publications_analytics" ? (
                <PostStatsDetails postsByPeriod={sortedPostsByPeriod} />
              ) : item.content === "subscriber_growth" ? (
                <PostStatsDetails subscribersDaily={subscribersDaily} />
              ) : item.content === "dynamics_posts" && selectedPostData ? (
                <PostStatsDetails selectedPostData={selectedPostData} />
              ) : item.content === "average_advertising" ? (
                <PostStatsDetails adReachPeriod={adReachPeriod} />
              ) : item.content === "average_coverage" ? (
                <PostStatsDetails analyticsReach={analyticsReach} />
              ) : 1}
            </StatsCardDetails>
          </ItemLeft>
          <ButtonsMore>
            {item.content === "dynamics_posts" && (
              <SelectContainer>
                <CustomSelectFour
                  options={postOptions}
                  value={selectedPost}
                  onChange={handleChangePost}
                  width="min-content"
                  right="-20px"
                />
              </SelectContainer>
            )}
            <BtnBase
              $color="#336CFF"
              $bg="#161F37"
              $padding="12px 24px"
              onClick={() => openPopup(item.content, "popup")}
            >
              Подробнее
            </BtnBase>
          </ButtonsMore>
          <StatsChartContainer>
            {item.content === "dynamics_posts" ? (
              <DayBarChart points={dayPoints} labels={dayLabels} width={400} height={150} />
            ) : item.content === "average_advertising" ? (
              <LineChart points={adReachPoints} labels={adReachLabels.map(l => l.short)} tooltipLabels={adReachLabels.map(l => l.full)} width={isSmall ? 700 : 400} height={150} type="adReach" filter={filter} />
            ) : item.content === "publications_analytics" ? (
              <LineChart points={postsByPeriodPoints} labels={postsByPeriodLabels.map(l => l.short)} tooltipLabels={postsByPeriodLabels.map(l => l.full)} width={isSmall ? 700 : 400} height={150} type="posts" filter={filter} />
            ) : item.content === "subscriber_growth" ? (
              <LineChart points={subscriberPoints} labels={subscriberLabels.map(l => l.short)} tooltipLabels={subscriberLabels.map(l => l.full)} width={isSmall ? 700 : 400} height={150} type="adReach" filter={filter} />
            ) : item.content === "average_coverage" ? (
              <LineChart points={averageCoveragePoints} labels={averageCoverageLabels.map(l => l.short)} tooltipLabels={averageCoverageLabels.map(l => l.full)} width={isSmall ? 700 : 400} height={150} type="adReach" filter={filter} />
            ) : item.content === "subscriptions_day" && (
              <LineChart points={subscriberPoints} labels={subscriberLabels.map(l => l.short)} tooltipLabels={subscriberLabels.map(l => l.full)} width={isSmall ? 700 : 400} height={150} type="adReach" filter={filter} />
            )}
          </StatsChartContainer>
        </StatisticsItem>
      ))}
    </StatisticsContainer>
  );
};

const StatisticsContainer = styled.div`
	margin-top: 40px;
	display: grid;
  grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
	gap: 16px;
	padding: 0 56px 30px;
	max-height: 450px;
	overflow-y: auto;
  scrollbar-width: none;

	@media(max-width: 1600px) { 
		padding: 0 32px 30px 
	}	
	@media(max-width: 768px) { 
		padding: 0 24px 30px;
		max-height: 850px;
    grid-template-columns: 1fr;
  }
`;
const StatisticsItem = styled.div`
box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	gap: 30px;
	position: relative;
  flex: 1;
  border: 2px solid #2E3954;
  border-radius: 32px;
  padding: 40px 30px 24px 40px;
  @media(max-width: 768px) { 
    flex-direction: column;
		align-items: flex-start;
		width: 100%;
	}
`;
const ButtonsMore = styled.div`
	position: absolute;
	display: flex;
	gap: 8px;
	right: 24px;
	top: 24px;
	z-index: 10;
  @media(max-width: 640px) { 
    position: static;
	}
`;
const SelectContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 24px;
	background-color: #1A1F2D;
	border-radius: 8px;
`;
const ItemLeft = styled.div`
	min-width: 150px;
	height: 100%;
`;
const ItemTitle = styled.h3`
  display: flex;
  gap: 6px;
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
`;
const StatsCardMainValue = styled.p`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 36px;
  font-weight: 800;

  span {
    font-size: 14px;
    font-weight: 600;
    color: #6A7080;
  }
`;
const StatsCardDetails = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StatsChartContainer = styled.div`
	display: grid;
	align-items: end;
	justify-items: start;
	grid-template-columns: 30px 1fr;
  grid-template-rows: 150px 20px;
	padding-top: 50px;
  @media(max-width: 768px) { 
    padding-top: 0px;
	}
`;

export default StatisticsTab