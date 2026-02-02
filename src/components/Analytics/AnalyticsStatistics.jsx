import styled from "styled-components";

import Empty from "@/shared/Empty";

import scale from "@/assets/scale.svg";
import PromotionIcon from "@/icons/PromotionIcon";
import SpeakerIcon from "@/icons/SpeakerIcon";
import my_team from "@/assets/popup/my-team.svg";

import useSwipeAllowed from "@/lib/useSwipeAllowed";
import { useChannelStat } from "@/lib/tgStat/useChannelStat";
import { useGetMetricsDay } from "@/lib/analytics/useGetMetricsDay";

const AnalyticsStatistics = ({ id, channelId }) => {
  const { isSwipe } = useSwipeAllowed(1800);

  const { channelStat, channelStatLoading } = useChannelStat({
    channelId: id,
  });

  const stat = channelStat?.response;
  const { metricsDay, metricsDayPending } = useGetMetricsDay(channelId);

  return (
    metricsDayPending ? (
      <EmptyContainer>
        <Empty icon="📊">Загрузка статистики...</Empty>
      </EmptyContainer>
    ) : (
      <StatisticsList
        key={isSwipe}
        spaceBetween={16}
        slidesPerView={isSwipe ? "auto" : 4}
        allowTouchMove={isSwipe}
      >
        <StatisticsItem>
          <StatisticsItemHead>
            <StatisticsItemImg $bgColor="#284B55">
              <img src={my_team} alt="" />
            </StatisticsItemImg>
            <StatisticsName>
              <StatisticsText>Подписчики</StatisticsText>
              <StatisticsCount>{stat?.current_subscribers || 0}</StatisticsCount>
            </StatisticsName>
          </StatisticsItemHead>
          <StatisticsItemContent>
            <ItemStat $value={metricsDay.subscribers.growth_24h}>
              <mark>{metricsDay.subscribers.growth_24h || 0}</mark>
              <p>Сегодня</p>
            </ItemStat>
            <ItemStat $value={metricsDay.subscribers.growth_7d_percent}>
              <mark>{metricsDay.subscribers.growth_7d_percent || 0}</mark>
              <p>Неделя</p>
            </ItemStat>
            <ItemStat $value={metricsDay.subscribers.growth_30d_percent}>
              <mark>{metricsDay.subscribers.growth_30d_percent || 0} %</mark>
              <p>месяц</p>
            </ItemStat>
          </StatisticsItemContent>
        </StatisticsItem>

        <StatisticsItem>
          <StatisticsItemHead>
            <StatisticsItemImg $bgColor="#5D443B">
              <SpeakerIcon color="#FF9C55" />
            </StatisticsItemImg>
            <StatisticsName>
              <StatisticsText>Суточный рекл. охват</StatisticsText>
              <StatisticsCount>{stat?.daily_reach}</StatisticsCount>
            </StatisticsName>
          </StatisticsItemHead>
          <StatisticsItemContent>
            <ItemStat $value={metricsDay.reach.err}>
              <mark>{metricsDay.reach.err || 0} %</mark>
              <p>ERR</p>
            </ItemStat>
            <ItemStat $value={metricsDay.reach.err24}>
              <mark>{metricsDay.reach.err24 || 0} %</mark>
              <p>ERR 24</p>
            </ItemStat>
            <ItemStat $value={metricsDay.reach.er}>
              <mark>{metricsDay.reach.er || 0} %</mark>
              <p>ER</p>
            </ItemStat>
          </StatisticsItemContent>
        </StatisticsItem>

        <StatisticsItem>
          <StatisticsItemHead>
            <StatisticsItemImg $bgColor="#374739">
              <PromotionIcon color="#B5EC5B" />
            </StatisticsItemImg>
            <StatisticsName>
              <StatisticsText>Суточный рекл. охват</StatisticsText>
              <StatisticsCount>{stat?.daily_reach || 0}</StatisticsCount>
            </StatisticsName>
          </StatisticsItemHead>
          <StatisticsItemContent>
            <ItemStat $value={metricsDay.reach.avg_ad_reach_12h}>
              <mark>{metricsDay.reach.avg_ad_reach_12h}</mark>
              <p>за 12 ч.</p>
            </ItemStat>
            <ItemStat $value={metricsDay.reach.avg_ad_reach_24h}>
              <mark>{metricsDay.reach.avg_ad_reach_24h}</mark>
              <p>за 24 ч.</p>
            </ItemStat>
            <ItemStat $value={metricsDay.reach.avg_ad_reach_48h}>
              <mark>{metricsDay.reach.avg_ad_reach_48h}</mark>
              <p>за 48 ч.</p>
            </ItemStat>
          </StatisticsItemContent>
        </StatisticsItem>

        <StatisticsItem>
          <StatisticsItemHead>
            <StatisticsItemImg $bgColor="#2B505B">
              <img src={scale} alt="scale icon" />
            </StatisticsItemImg>
            <StatisticsName>
              <StatisticsText>Публикации</StatisticsText>
              <StatisticsCount>{stat?.posts_count || 0}</StatisticsCount>
            </StatisticsName>
          </StatisticsItemHead>
          <StatisticsItemContent>
            <ItemStat $value={metricsDay.posts.today}>
              <mark>{metricsDay.posts.today || 0}</mark>
              <p>Сегодня</p>
            </ItemStat>
            <ItemStat $value={metricsDay.posts.today}>
              <mark>{metricsDay.posts.week || 0}</mark>
              <p>Неделя</p>
            </ItemStat>
            <ItemStat $value={metricsDay.posts.today}>
              <mark>{metricsDay.posts.month || 0}</mark>
              <p>месяц</p>
            </ItemStat>
          </StatisticsItemContent>
        </StatisticsItem>
      </StatisticsList>
    )
  );
};

const StatisticsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 52px;
  padding: 0 56px;

  @media(max-width: 1600px) { 
    padding: 0 32px ;
	}	
  @media(max-width: 991px) { 
   grid-template-columns: repeat(2, 1fr);
	}	
  @media (max-width: 768px) {
    padding: 0 24px;
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`
const StatisticsItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 1;
  box-sizing: border-box;
  padding: 24px;
  border-radius: 24px;
  background-color: #181E30;

  @media (max-width: 1600px) {
    padding: 20px 24px 24px;
  }
  @media (max-width: 560px) {
    align-items: center;
  }
`
const StatisticsItemHead = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 36px;
  line-height: 36px;
  font-weight: 800;
`

const StatisticsName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
const StatisticsItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 200px;
  gap: 20px;
`
const ItemStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
   mark {
    font-size: 10px;
    font-weight: 600;
    color: ${({ $value }) =>
    $value > 0 ? "#B5EC5B" : $value < 0 ? "#EF6284" : "#6A7080"};
  }
  p {
    text-transform: uppercase;
    color: #6A7080;
    font-size: 10px;
    font-weight: 600;
  }
`
const StatisticsItemImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: ${props => props.$bgColor};
  width: 32px;
  height: 32px;
  padding: 8px;
  border-radius: 8px;
`
const StatisticsText = styled.p`
  color: #6A7080;
  font-size: 10px;
  line-height: 10px;
  font-weight: 600;
  margin-bottom: 4px;
`
const StatisticsCount = styled.p`
  font-size: 24px;
  line-height: 24px;
  font-weight: 800;
`
const EmptyContainer = styled.div`
  margin-top: 52px;
  padding: 0 56px;

  @media(max-width: 1600px) { 
    padding: 0 32px ;
	}	

  @media (max-width: 768px) {
    padding: 0 24px;
  }
`

export default AnalyticsStatistics