import { useEffect } from "react";
import styled from "styled-components";

import BtnBase from "@/shared/BtnBase";
import CustomSelectFour from "@/shared/CustomSelectFour";
import DayBarChart from "@/components/Analytics/DayBarChart";
import LineChart from "@/components/Analytics/LineChart";
import PostStatsDetails from "@/components/Analytics/PostStatsDetails";

import { useGetSubscribersDaily } from "@/lib/analytics/useGetSubscribersDaily";
import { useGetAdReachPeriod } from "@/lib/analytics/useGetAdReachPeriod";
import { useGetPostsByPeriod } from "@/lib/analytics/useGetPostsByPeriod";
import { useGetAnalyticsReach } from "@/lib/analytics/useGetAnalyticsReach";
import { usePostViewsDynamics } from "@/hooks/analytics/usePostViewsDynamics";

import useResolution from "@/hooks/useResolution";

import { useAnalyticsStore } from "@/store/useAnalyticsStore";
import { usePopupStore } from "@/store/popupStore";

const statisticsData = [
  { title: "Подписчики", mainSubValue: "Всего", content: 'subscriber_growth' },
  { title: "Подписки / Отписки за 24ч", mainSubValue: "Итого", content: 'subscriptions_day' },
  { title: "Анализ просмотров", mainSubValue: "Просмотры", content: 'dynamics_posts' },
  { title: "/ Рекламный", mainSubValue: "За сутки", content: 'average_advertising' },
  { title: "Публикации", mainSubValue: "Всего", content: 'publications_analytics' },
  { title: "1 публикации", mainSubValue: "За сутки", content: 'average_coverage' },
];

const parseLocalDate = (dateStr) => {
  const [y, m, d] = dateStr.split("-");
  return new Date(y, m - 1, d);
};

const StatisticsTab = ({ id, channel_id, dateRanges }) => {
  const { isSmall } = useResolution(768);
  const { openPopup } = usePopupStore();

  const {
    dayPoints, dayLabels, subscriberPoints, subscriberLabels, subscriberDayPoints, subscriberDayLabels,
    adReachPoints, adReachLabels,
    postsByPeriodPoints, postsByPeriodLabels,
    averageCoverageAvgPoints, averageCoverageAvgLabels,
    dayFilter, subscriberFilter, adReachFilter, postsByPeriodFilter, averageCoverageAvgFilter,
    setSubscriberData, setSubscriberDayData, setAdReachData, setPostsByPeriodData,
    setAverageCoverageAvgData, setAverageCoverageErData, setAverageCoverageErr24Data, setAverageCoverageErrData
  } = useAnalyticsStore();
  const { selectedPostData, setSelectedPost, postOptions } = usePostViewsDynamics({ channel_id, dayFilter, dateRanges });

  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];

  const { postsByPeriod } = useGetPostsByPeriod(
    {
      channel_id,
      ...(postsByPeriodFilter === "24h"
        ? {
          date_from: dateRanges.postsByPeriodFilterRange.dateToStr,
          date_to: dateRanges.postsByPeriodFilterRange.dateToStr
        }
        : {
          date_from: dateRanges.postsByPeriodFilterRange.dateFromShort,
          date_to: dateRanges.postsByPeriodFilterRange.dateToShort
        }
      )
    });
  const { subscribersDaily } = useGetSubscribersDaily({
    channel_id,
    ...(subscriberFilter === "24h"
      ? { date: formattedToday }
      : {
        date_from: dateRanges.subscriberFilterRange.dateFromShort,
        date_to: dateRanges.subscriberFilterRange.dateToShort
      }
    )
  });
  const { subscribersDaily: subscribersDay } = useGetSubscribersDaily({
    channel_id,
    date: formattedToday
  });

  const { adReachPeriod } = useGetAdReachPeriod({
    channel_id,
    ...(adReachFilter === "24h"
      ? {}
      : {
        date_from: dateRanges.adReachFilterRange.dateFromShort,
        date_to: dateRanges.adReachFilterRange.dateToShort
      }
    )
  });

  useEffect(() => {
    if (!subscribersDaily) return;

    let points = [];
    let labels = [];

    if (subscriberFilter === "24h" && subscribersDaily.hourly?.length) {
      points = subscribersDaily.hourly.map(h => h.subscriber_count || 0);
      labels = subscribersDaily.hourly.map(h => ({
        short: h.time_label,
        full: `${h.time_label} ч.`,
        delta: h.delta || 0,
        joined: h.joined || 0,
        left: h.left || 0
      }));
    } else if (subscribersDaily.daily_data?.length) {
      points = subscribersDaily.daily_data.map(d => d.subscriber_count || 0);
      labels = subscribersDaily.daily_data.map(d => {
        const dateObj = parseLocalDate(d.date);
        return {
          short: dateObj.toLocaleDateString("ru-RU", { day: "numeric" }),
          medium: dateObj.toLocaleDateString("ru-RU", { day: "numeric", month: "numeric" }),
          full: dateObj.toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" }),
          delta: d.delta || 0,
          joined: d.joined || 0,
          left: d.left || 0
        };
      });
    }

    setSubscriberData(points, labels);
  }, [subscribersDaily, subscriberFilter, setSubscriberData]);

  useEffect(() => {
    if (!subscribersDay?.hourly?.length) return;

    const points = subscribersDay.hourly.map(h => h.subscriber_count || 0);
    const labels = subscribersDay.hourly.map(h => ({
      short: `${h.time_label}`,
      medium: `${h.time_label}`,
      full: `${h.time_label} ч.`,
      delta: h.delta || 0,
      joined: h.joined || 0,
      left: h.left || 0,
    }));

    setSubscriberDayData(points, labels);
  }, [subscribersDay, setSubscriberDayData]);

  useEffect(() => {
    if (!adReachPeriod) return;

    let points = [];
    let labels = [];
    if (adReachFilter === "24h" && adReachPeriod.hourly?.length) {
      points = adReachPeriod.hourly.map(h => Number(h.avg_ad_reach) || 0);
      labels = adReachPeriod.hourly.map(h => ({
        short: h.time_label,
        full: `${h.time_label} ч.`,
      }));
    } else if (adReachPeriod.daily?.length) {
      const numericFilter = Number(adReachFilter) || 1;
      points = adReachPeriod.daily.map(d => (Number(d.avg_ad_reach) || 0) * numericFilter);
      labels = adReachPeriod.daily.map(d => {
        const dateObj = parseLocalDate(d.date);
        return {
          short: dateObj.toLocaleDateString("ru-RU", { day: "numeric" }),
          medium: dateObj.toLocaleDateString("ru-RU", { day: "numeric", month: "numeric" }),
          full: dateObj.toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" })
        };
      });
    }

    setAdReachData(points, labels);
  }, [adReachPeriod, adReachFilter, adReachFilter, setAdReachData]);

  useEffect(() => {
    if (!postsByPeriod) return;

    let points = [];
    let labels = [];
    let hourly = [];

    if (postsByPeriodFilter === "24h" && postsByPeriod.data[0].hourly?.length) {
      points = postsByPeriod.data[0].hourly.map(h => h.posts_count || 0);
      labels = postsByPeriod.data[0].hourly.map(h => {
        const hour = parseInt(h.time_label.split(":")[0], 10);
          return {
          short: `${hour}`,
          medium: `${h.time_label}`,
          full: `${h.time_label} ч.`,
          }
        });
      hourly = postsByPeriod.data;
    } else if (postsByPeriod.data?.length) {
      points = postsByPeriod.data.map(p => p.posts_count || 0);
      labels = postsByPeriod.data.map(p => {
        const dateObj = parseLocalDate(p.date);

        return {
          short: dateObj.toLocaleDateString("ru-RU", { day: "numeric" }),
          medium: dateObj.toLocaleDateString("ru-RU", { day: "numeric", month: "numeric" }),
          full: dateObj.toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" }),
        };
      });
      hourly = postsByPeriod.data;
    }

    setPostsByPeriodData(points, labels, hourly);

  }, [postsByPeriod, postsByPeriodFilter, setPostsByPeriodData]);

  const { analyticsReach } = useGetAnalyticsReach({
    channel_id,
    ...(averageCoverageAvgFilter === "24h"
      ? { days: 1 }
      : {
        date_from: dateRanges.averageCoverageAvgFilterRange.dateFromShort,
        date_to: dateRanges.averageCoverageAvgFilterRange.dateToShort
      }
    )
  });

  useEffect(() => {
    if (!analyticsReach) return;
    const pointsAvg = [];
    const pointsEr = [];
    const pointsErr24 = [];
    const pointsErr = [];
    const labels = [];

    if (averageCoverageAvgFilter === "24h" && analyticsReach.hourly?.length) {
      analyticsReach.hourly.forEach(h => {

        pointsAvg.push(h.avg_reach || 0);
        pointsEr.push(h.er_percent || 0);
        pointsErr24.push(h.err24_percent || 0);
        pointsErr.push(h.err_percent || 0);

        labels.push({
          short: `${h.time_label}`,
          medium: `${h.time_label} ч.`,
          full: `${h.time_label} ч.`,
          er_percent: h.er_percent || 0,
          err24_percent: h.err24_percent || 0,
          err_percent: h.err_percent || 0,
        });
      });
    }

    else if (analyticsReach.daily?.length) {
      analyticsReach.daily.forEach(d => {
        const dateObj = parseLocalDate(d.date);

        pointsAvg.push(d.avg_reach || 0);
        pointsEr.push(d.er_percent || 0);
        pointsErr24.push(d.err24_percent || 0);
        pointsErr.push(d.err_percent || 0);

        labels.push({
          short: dateObj.toLocaleDateString("ru-RU", { day: "numeric" }),
          medium: dateObj.toLocaleDateString("ru-RU", { day: "numeric", month: "numeric" }),
          full: dateObj.toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" }),
          er_percent: analyticsReach.er_percent || 0,
          err24_percent: analyticsReach.err24_percent || 0,
          err_percent: analyticsReach.err_percent || 0,
        });
      });
    }

    setAverageCoverageAvgData(pointsAvg, labels);
    setAverageCoverageErData(pointsEr, labels);
    setAverageCoverageErr24Data(pointsErr24, labels);
    setAverageCoverageErrData(pointsErr, labels);

  }, [
    analyticsReach,
    averageCoverageAvgFilter,
    setAverageCoverageAvgData,
    setAverageCoverageErData,
    setAverageCoverageErr24Data,
    setAverageCoverageErrData
  ]);

  const handleChangePost = (value) => setSelectedPost(value);

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
                postsByPeriod?.data?.reduce((sum, p) => sum + (p.posts_count || 0), 0) || 0
              ) : item.content === "subscriber_growth" ? (
                subscribersDaily?.current_subscribers || 0
              ) : item.content === "subscriptions_day" ? (
                subscribersDay?.by_day.delta || 0
              ) : item.content === "dynamics_posts" && selectedPostData ? (
                <>
                  <span>Пост #{selectedPostData.post_id}</span>
                  {selectedPostData.total_views || 0}
                </>
              ) : item.content === "average_advertising" ? (
                adReachPeriod?.by_day.avg_ad_reach || 0
              ) : item.content === "average_coverage" && (
                analyticsReach?.avg_views_per_post || 0
              )}
              {item.mainSubValue && <span>{item.mainSubValue}</span>}
            </StatsCardMainValue>
            <StatsCardDetails>
              {item.content === "publications_analytics" ? (
                <PostStatsDetails postsByPeriod={postsByPeriod} />
              ) : item.content === "subscriber_growth" ? (
                <PostStatsDetails subscribersDaily={subscribersDaily} />
              ) : item.content === "subscriptions_day" ? (
                <PostStatsDetails subscribersDay={subscribersDay} />
              ) : item.content === "dynamics_posts" && selectedPostData ? (
                <PostStatsDetails selectedPostData={selectedPostData} />
              ) : item.content === "average_advertising" ? (
                <PostStatsDetails adReachPeriod={adReachPeriod} />
              ) : item.content === "average_coverage" && (
                <PostStatsDetails analyticsReach={analyticsReach} />
              )}
            </StatsCardDetails>
          </ItemLeft>
          <ButtonsMore>
            {item.content === "dynamics_posts" && (
              <SelectContainer>
                <CustomSelectFour
                  options={postOptions}
                  value={selectedPostData?.post_id}
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
              onClick={() => openPopup(item.content, "popup", {
                channelId: id,
                channel_id: channel_id,
                dateRanges
              })}
            >
              Подробнее
            </BtnBase>
          </ButtonsMore>
          <StatsChartContainer>
            {item.content === "dynamics_posts" ? (
              <DayBarChart
                points={dayPoints}
                labels={dayLabels}
                hoverLabels={dayLabels.map(l => l.full)}
                width={400}
                type="dynamicsPosts"
                height={150} />
            ) : item.content === "average_advertising" ? (
              <LineChart
                points={adReachPoints}
                labels={adReachLabels}
                hoverLabels={adReachLabels.map(l => l.full)}
                width={isSmall ? 700 : 400}
                height={150}
                type="adReach"
                filter={adReachFilter}
              />
            ) : item.content === "publications_analytics" ? (
              <LineChart
                points={postsByPeriodPoints}
                labels={postsByPeriodLabels}
                hoverLabels={postsByPeriodLabels.map(l => l.full)}
                width={isSmall ? 700 : 400}
                height={150}
                type="posts"
                filter={postsByPeriodFilter}
              />
            ) : item.content === "subscriber_growth" ? (
              <LineChart
                points={subscriberPoints}
                labels={subscriberLabels}
                hoverLabels={subscriberLabels.map(l => l.full)}
                width={isSmall ? 700 : 400}
                height={150}
                type="subscriber_growth"
                filter={subscriberFilter}
              />
            ) : item.content === "subscriptions_day" ? (
              <LineChart
                points={subscriberDayPoints}
                labels={subscriberDayLabels}
                hoverLabels={subscriberDayLabels.map(l => l.full)}
                width={isSmall ? 700 : 400}
                height={150}
                type="subscriptions_day"
                filter={subscriberFilter}
              />
            ) : item.content === "average_coverage" && (
              <LineChart
                points={averageCoverageAvgPoints}
                labels={averageCoverageAvgLabels}
                hoverLabels={averageCoverageAvgLabels.map(l => l.full)}
                width={isSmall ? 700 : 400}
                height={150}
                type="averageCoverage"
                filter={averageCoverageAvgFilter}
              />
            )}
          </StatsChartContainer>
        </StatisticsItem>
      ))}
    </StatisticsContainer>
  );
};

const StatisticsContainer = styled.div`
box-sizing: border-box;
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
  gap: 16px;
  padding: 0 56px 30px;
  min-height: 610px;
  max-height: 610px;
  overflow-y: auto;
  scrollbar-width: none;

  @media(max-width: 1600px) { 
    padding: 0 32px 30px;
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
  max-width: 150px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
  flex-grow: 1;

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
  grid-template-columns: max-content 1fr;
  gap: 0 20px;
  flex: 1;
  grid-template-rows: 150px 30px;
  padding-top: 50px;
  @media(max-width: 768px) { 
    padding-top: 0px;
  }
`;

export default StatisticsTab;