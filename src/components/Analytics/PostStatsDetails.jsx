import { useState, useEffect } from "react";
import styled from "styled-components";

const PostStatsDetails = ({ postsByPeriod, selectedPostData, subscribersDaily, subscribersDay, adReachPeriod, analyticsReach }) => {
  const [counts, setCounts] = useState({ yesterday: 0, week: 0, month: 0 });

  useEffect(() => {
    const today = new Date();
    const formatDate = (date) => date.toISOString().split("T")[0];

    const todayStr = formatDate(today);
    const weekAgoStr = formatDate(new Date(today.getTime() - 7 * 86400000));
    const monthAgoStr = formatDate(new Date(today.getTime() - 30 * 86400000));

    if (adReachPeriod) {
      setCounts({
        yesterday: adReachPeriod.by_day?.avg_ad_reach || 0,
        week: adReachPeriod.by_week?.avg_ad_reach || 0,
        month: adReachPeriod.by_month?.avg_ad_reach || 0,
      });
      return;
    }

    if (subscribersDaily?.daily_data) {
      const data = subscribersDaily.daily_data;

      const yesterday = data
        .filter(d => d.date === todayStr)
        .reduce((sum, d) => sum + (d.delta || 0), 0);

      const week = data
        .filter(d => d.date >= weekAgoStr)
        .reduce((sum, d) => sum + (d.delta || 0), 0);

      const month = data
        .filter(d => d.date >= monthAgoStr)
        .reduce((sum, d) => sum + (d.delta || 0), 0);

      setCounts({ yesterday, week, month });
      return;
    }
    if (postsByPeriod) {
      const yesterday = postsByPeriod.posts_last_day
      const week = postsByPeriod.posts_last_week
      const month = postsByPeriod.posts_last_month
      setCounts({ yesterday, week, month });
    }
  }, [postsByPeriod, selectedPostData, subscribersDaily, adReachPeriod, analyticsReach]);

  if (selectedPostData) {
    return (
      <>
        <StatsCardDetailItem>
          {selectedPostData.total_er_percent || 0}% <span>ER</span>
        </StatsCardDetailItem>
        <StatsCardDetailItem>
          {selectedPostData.reposts || 0} <span>Репосты</span>
        </StatsCardDetailItem>
        <StatsCardDetailItem>
          <span>
            {new Date(selectedPostData.post_date).toLocaleString("ru-RU", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </StatsCardDetailItem>
      </>
    );
  }
  if (analyticsReach) {
    return (
      <>
        <StatsCardDetailItem>
          {analyticsReach?.er_percent || 0} % <span>ER</span>
        </StatsCardDetailItem>
        <StatsCardDetailItem>
          {analyticsReach?.err_percent || 0} % <span>ERR</span>
        </StatsCardDetailItem>
        <StatsCardDetailItem>
          {analyticsReach?.err24_percent || 0} % <span>ERR 24ч</span>
        </StatsCardDetailItem>
      </>
    );
  }
  if (subscribersDay) {
    return (
      <>
        <StatsCardDetailItem $value={subscribersDay.by_day.left}>
          {subscribersDay.by_day.left} <span>Подписки</span>
        </StatsCardDetailItem>

        <StatsCardDetailItem $value={subscribersDay.by_day.delta}>
          {subscribersDay.by_day.delta} <span>Отписки</span>
        </StatsCardDetailItem>
      </>
    );
  }

  return (
    <>
      <StatsCardDetailItem $value={counts.yesterday}>
        {counts.yesterday} <span>за день</span>
      </StatsCardDetailItem>
      <StatsCardDetailItem $value={counts.week}>
        {counts.week} <span>за неделю</span>
      </StatsCardDetailItem>
      <StatsCardDetailItem $value={counts.month}>
        {counts.month} <span>за месяц</span>
      </StatsCardDetailItem>
    </>
  );
};
const StatsCardDetailItem = styled.p`
  display: flex;
  gap: 24px;
  font-weight: 800;
  color: ${({ $value }) =>
    $value > 0 ? "#B5EC5B" : $value < 0 ? "#EF6284" : "#D6DCEC"};

  span {
    font-size: 14px;
    font-weight: 600;
    color: #6A7080;
  }
`;
export default PostStatsDetails;
