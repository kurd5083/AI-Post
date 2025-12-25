import styled from "styled-components";
import rating from "@/assets/statistics/rating.svg";
import { statisticsDatas } from "@/data/statisticsDatas";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useSwipeAllowed from "@/lib/useSwipeAllowed";

const Statistics = () => {
  const { isSwipe } = useSwipeAllowed(1600);

  return (
    <StatisticsContainer>
      <StatisticsTitle>
        <img src={rating} alt="rating icon" />Статистика
      </StatisticsTitle>

      <StatisticsList
        key={isSwipe}
        spaceBetween={16}
        slidesPerView={isSwipe ? "auto" : statisticsDatas.length}
        allowTouchMove={isSwipe}
      >
        {statisticsDatas.map((item, index) => (
          <StatisticsItem key={index}>
            <StatisticsItemHead>
              <StatisticsItemImg $bgColor={item.bgColor}>
                <img
                  src={item.image}
                  alt={item.text}
                />
              </StatisticsItemImg>
              <p>{item.number}</p>
            </StatisticsItemHead>
            <StatisticsText>{item.text}</StatisticsText>
          </StatisticsItem>
        ))}
      </StatisticsList>
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
  gap: 24px;
  @media (max-width: 1400px) {
    padding: 0 32px;
  }
  @media (max-width: 768px) {
    padding: 0 24px;
  }
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

export default Statistics
