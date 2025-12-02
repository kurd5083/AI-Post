import styled from "styled-components";
import rating from "@/assets/statistics/rating.svg";
import { statistics } from "@/data/statistics";

const Statistics = () => {
  return (
    <StatisticsContainer>
      <StatisticsTitle><img src={rating} alt="rating icon" />Статистика</StatisticsTitle>
      <StatisticsList>
        {statistics.map((item, index) => (
          <StatisticsItem key={index}>
            <StatisticsItemHead>
              <StatisticsItemImg src={item.image} alt={item.text} bgColor={item.bgColor}/>
              <p>{item.number}</p>
            </StatisticsItemHead>
            <StatisticsText>{item.text}</StatisticsText>
          </StatisticsItem>
        ))}
      </StatisticsList>
    </StatisticsContainer>
  )
}

const StatisticsContainer = styled.section`
    margin-top: 50px;
    padding: 0 24px;
`
const StatisticsTitle = styled.h2`
    display: flex;
    align-items: center;
    gap: 24px;
`
const StatisticsList = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-top: 35px;
`
const StatisticsItem = styled.article`
    flex: 1;
    box-sizing: border-box;
    padding: 32px;
    border-radius: 24px;
    background-color: #181E30;
    height: 130px;
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
    background-color: ${props => props.bgColor};
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
