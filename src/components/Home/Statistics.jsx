import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import rating from "@/assets/statistics/rating.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useSwipeAllowed from "@/lib/useSwipeAllowed";
import { useChannelStat } from "@/lib/tgStat/useChannelStat";
import channels from "@/assets/statistics/channels.svg";
import views from "@/assets/statistics/views.svg";
import generated from "@/assets/statistics/generated.svg";
import mentions from "@/assets/statistics/mentions.svg";
import CustomSelectThree from "@/shared/CustomSelectThree";
import { useUserChannels } from "@/lib/channels/useUserChannels";


const Statistics = () => {
  const { isSwipe } = useSwipeAllowed(1600);
  const { userChannels } = useUserChannels();
  const [selectedChannels, setSelectedChannels] = useState([]);

  useEffect(() => {
    if (userChannels?.length) {
      setSelectedChannels(userChannels?.map(c => c.id));
    }
  }, [userChannels]);

  const { channelStat, channelStatLoading } = useChannelStat({
    channelIds: selectedChannels,
  });

  const aggregatedStat = useMemo(() => {
  if (!channelStat?.length) return null;

  return channelStat.reduce(
    (acc, { data }) => {
      const resp = data.response || {};
      acc.generated_posts += resp.posts_count || 0;
      acc.mentions_count += resp.mentions_count || 0;
      return acc;
    },
    { generated_posts: 0, mentions_count: 0 }
  );
}, [channelStat]);

  return (
    <StatisticsContainer>
      <StatisticsTitle>
        <TitleLeft>
          <img src={rating} alt="rating icon" />
          Статистика
        </TitleLeft>
        <CustomSelectThree
          options={userChannels?.map((c) => ({
            id: c.id,
            label: c.name,
            avatar: c.avatarUrl,
          }))}
          value={selectedChannels}
          onChange={setSelectedChannels}
        />
      </StatisticsTitle>
      {(!channelStat || !selectedChannels?.length) ? (
        <EmptyStat>Здесь появится статистика по вашим каналам</EmptyStat>
      ) : (
        <StatisticsList
          key={isSwipe}
          spaceBetween={16}
          slidesPerView={isSwipe ? "auto" : 4}
          allowTouchMove={isSwipe}
        >
          <StatisticsItem>
            <StatisticsItemHead>
              <StatisticsItemImg $bgColor="#203442">
                <img src={channels} alt="channels icon" />
              </StatisticsItemImg>
              <p>{userChannels?.length || 0}</p>
            </StatisticsItemHead>
            <StatisticsText>Подключено каналов</StatisticsText>
          </StatisticsItem>

          <StatisticsItem>
            <StatisticsItemHead>
              <StatisticsItemImg $bgColor="#20356E">
                <img src={views} alt="views icon" />
              </StatisticsItemImg>
              {/* <p>{aggregatedStat?.posts_count?.toLocaleString() || 0}</p> */}
            </StatisticsItemHead>
            <StatisticsText>Общие просмотры постов</StatisticsText>
          </StatisticsItem>

          <StatisticsItem>
            <StatisticsItemHead>
              <StatisticsItemImg $bgColor="#522943">
                <img src={generated} alt="generated icon" />
              </StatisticsItemImg>
              <p>{aggregatedStat?.generated_posts?.toLocaleString() || 0}</p>
            </StatisticsItemHead>
            <StatisticsText>Сгенерировано постов</StatisticsText>
          </StatisticsItem>

          <StatisticsItem>
            <StatisticsItemHead>
              <StatisticsItemImg $bgColor="#5D443B">
                <img src={mentions} alt="mentions icon" />
              </StatisticsItemImg>
              <p>{aggregatedStat?.mentions_count?.toLocaleString() || 0}</p>
            </StatisticsItemHead>
            <StatisticsText>Упоминаний всего</StatisticsText>
          </StatisticsItem>
        </StatisticsList>
      )}
    </StatisticsContainer>
  );
};

const StatisticsContainer = styled.section`
  position: relative;
  margin-top: 24px;
  padding: 0 56px;
    
  @media (max-width: 1600px) {
    padding: 0 32px;
  }
    
  @media (max-width: 1400px) {
    padding: 0;
  }
  @media (max-width: 480px) {
    margin-top: 0px;
  }
`
const StatisticsTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 30px;
  @media (max-width: 1400px) {
    padding: 0 32px;
  }
  @media (max-width: 768px) {
    padding: 0 24px;
  }
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`
const TitleLeft = styled.span`
  display: flex;
  align-items: center;
  gap: 24px;
`
const StatisticsList = styled(Swiper)`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 32px;
  @media (max-width: 1400px) {
    padding: 0 32px;
  }
  @media (max-width: 768px) {
    padding: 0 24px;
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

  @media (max-width: 1600px) {
    padding: 20px 24px 24px;
    flex: none;
    width: max-content;
  }
   @media (max-width: 1600px) {
    padding: 32px;
  
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
`;

export default Statistics
