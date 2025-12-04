import styled from "styled-components";
import rating from "@/assets/statistics/rating.svg";
import { statistics } from "@/data/statistics";
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
        slidesPerView={isSwipe ? "auto" : statistics.length}
        allowTouchMove={isSwipe}
      >
        {statistics.map((item, index) => (
          <StatisticsItem key={index}>
            <StatisticsItemHead>
              <StatisticsItemImg
                src={item.image}
                alt={item.text}
                $bgColor={item.bgColor}
              />
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
  margin-top: 50px;
  padding: 0 clamp(0px, calc((100vw - 1600px) * 24 / 400), 24px);
  @media (max-width: 1600px) {
    padding: 0 32px;
  }
  @media (max-width: 1400px) {
    padding: 0;
  }
  @media (max-width: 480px) {
    margin-top: 32px;
  }
`
const StatisticsTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 24px;
  @media (max-width: 1400px) {
    padding: 0 32px;
  }
  @media (max-width: 480px) {
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
  @media (max-width: 480px) {
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
const StatisticsItemImg = styled.img`
  background-color: ${props => props.$bgColor};
  width: 16px;
  height: 16px;
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
