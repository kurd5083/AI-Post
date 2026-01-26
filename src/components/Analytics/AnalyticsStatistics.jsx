import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import scale from "@/assets/scale.svg";
import PromotionIcon from "@/icons/PromotionIcon";
import SpeakerIcon from "@/icons/SpeakerIcon";
import my_team  from "@/assets/popup/my-team.svg";

import useSwipeAllowed from "@/lib/useSwipeAllowed";
import { useChannelStat } from "@/lib/tgStat/useChannelStat";

const AnalyticsStatistics = ({id}) => {
  const { isSwipe } = useSwipeAllowed(1800);
    const { channelStat, channelStatLoading } = useChannelStat({
      channelId: id,
    });
  
    const stat = channelStat?.response;
    console.log(stat)
  return (
    <StatisticsList
      key={isSwipe}
      spaceBetween={16}
      slidesPerView={isSwipe ? "auto" : 4}
      allowTouchMove={isSwipe}
    >
      <StatisticsItem>
        <StatisticsItemHead>
          <StatisticsItemImg $bgColor="#284B55">
            <img src={scale} alt="scale icon" />
          </StatisticsItemImg>
          <p>{stat?.daily_reach}</p>
        </StatisticsItemHead>
        <StatisticsText>Средний суточный охват</StatisticsText>
      </StatisticsItem>

      <StatisticsItem>
        <StatisticsItemHead>
          <StatisticsItemImg $bgColor="#374739">
            <PromotionIcon color="#B5EC5B"/>
          </StatisticsItemImg>
          {/* <p>{stat?.adv_post_reach_24h}</p> */}
        </StatisticsItemHead>
        <StatisticsText>Подписки за 24 ч.</StatisticsText>
      </StatisticsItem>

      <StatisticsItem>
        <StatisticsItemHead>
          <StatisticsItemImg $bgColor="#5D443B">
            <SpeakerIcon color="#FF9C55"/>
          </StatisticsItemImg>
          {/* <p>{stat.posts_count_24h}</p> */}
        </StatisticsItemHead>
        <StatisticsText>Публикации за 24 ч.</StatisticsText>
      </StatisticsItem>

      <StatisticsItem>
        <StatisticsItemHead>
          <StatisticsItemImg $bgColor="#253D59">
            <img src={my_team} alt="" />
          </StatisticsItemImg>
          <p>{stat?.participants_count}</p>
        </StatisticsItemHead>
        <StatisticsText>Среднее кол-во подписок</StatisticsText>
      </StatisticsItem>
    </StatisticsList>
  );
};

const StatisticsList = styled(Swiper)`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 52px;
  padding: 0 56px;

  @media(max-width: 1600px) { 
    padding: 0 32px 
	}	

  @media (max-width: 768px) {
    padding: 0 24px
  }
`
const StatisticsItem = styled(SwiperSlide)`
  flex: 1;
  box-sizing: border-box;
  padding: 32px;
  border-radius: 24px;
  background-color: #181E30;
  height: 130px;
  &:last-child {
    margin-right: 0 !important;
  }

  @media (max-width: 1800px) {
    flex: none;
    width: max-content;
  }
   @media (max-width: 1600px) {
    padding: 20px 24px 24px;
  }
`
const StatisticsItemHead = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 17px;
  font-size: 36px;
  line-height: 36px;
  font-weight: 800;
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
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 17px;
  color: #6A7080;
  font-size: 14px;
  font-weight: 600;
`
const EmptyStat = styled.div`
  box-sizing: border-box;
  text-align: center;
  color: #6A7080;
  padding: 48px 0;
  font-weight: 600;
  background-color: #1C2438;
  border-radius: 16px;
  margin-top: 32px;
  @media (max-width: 1400px) {
    margin: 32px 32px 0;
  }
  @media (max-width: 768px) {
    margin: 32px 24px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export default AnalyticsStatistics
