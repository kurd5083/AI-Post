import { useMemo } from "react";
import styled from "styled-components";

import DayBarChart from "@/components/Analytics/DayBarChart";
import ChartHead from "@/components/Popup/Analytics/ChartHead";

import { useAnalyticsStore } from "@/store/useAnalyticsStore";

const PublicationsAnalyticsPopup = () => {
    const { postsByPeriodPoints, postsByPeriodLabels, postsByPeriodFilter } = useAnalyticsStore();
    const data = [
        { dates: "20 Декабря, Пн", values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { dates: "21 Декабря, Вт", values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { dates: "22 Декабря, Пн", values: [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { dates: "23 Декабря, Вт", values: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { dates: "24 Декабря, Пн", values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
        { dates: "25 Декабря, Вт", values: [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0] },
    ];
    const selectedFilter = postsByPeriodFilter;

    const points = useMemo(() => postsByPeriodPoints.map((p) => (Number(p) || 0) * (Number(selectedFilter) || 1)), [postsByPeriodPoints, selectedFilter]);
    const labels = useMemo(() => postsByPeriodLabels.map((l) => l.short), [postsByPeriodLabels]);
    const tooltipLabels = useMemo(() => postsByPeriodLabels.map((l) => l.medium), [postsByPeriodLabels]);
    const hoverLabels = useMemo(() => postsByPeriodLabels.map((l) => l.full), [postsByPeriodLabels]);
    
    const hours = Array.from({ length: 24 }, (_, i) => i + 1);
    return (
        <Container>
            <ChartHead content="publications_analytics" />

            <ChartContainer>
                <DayBarChart
                    points={points}
                    labels={labels}
                    tooltipLabels={tooltipLabels}
                    hoverLabels={hoverLabels}
                    width={700}
                    height={300}
                    type="postsByPeriod"
                    filter={selectedFilter}
                    showGrid={true}
                    maxColumnWidth8={true}
                />
            </ChartContainer>

            <ContainerTitle>График публикаций</ContainerTitle>
            <HoursRow>
                <EmptyLabel />
                <Hours>
                    {hours.map((hour) => (
                        <HourLabel key={hour}>{hour}</HourLabel>
                    ))}
                </Hours>
            </HoursRow>
            <GridContainer>
                {data.map((day, i) => (
                    <Row key={i}>
                        <DayLabel>{day.dates}</DayLabel>
                        <Hours>
                            {day.values.map((val, j) => (
                                <Cell key={j} intensity={val} />
                            ))}
                        </Hours>
                    </Row>
                ))}
            </GridContainer>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    padding-bottom: 30px;
`;
const ChartContainer = styled.div`
    display: grid;
    align-items: end;
    justify-items: start;
    grid-template-columns: 30px 1fr;
    grid-template-rows: 300px 20px;
    padding: 0 56px;
    margin-top: 40px;

    @media(max-width: 1600px) {
        padding: 0 32px;
    }
    @media(max-width: 768px) {
        padding: 0 24px;
    }
`;
const ContainerTitle = styled.h3`
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 32px;
    font-weight: 700;
    margin-top: 60px;
    margin-bottom: 32px;
    padding: 0 56px;

    @media(max-width: 1600px) {
        padding: 0 32px;
    }
    @media(max-width: 768px) {
        padding: 0 24px;
    }
`;
const HoursRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 56px;
    margin-bottom: 16px;

    @media(max-width: 1600px) {
        padding: 0 32px;
    }
    @media(max-width: 768px) {
        padding: 0 24px;
    }
`;
const EmptyLabel = styled.div`
    min-width: 120px;
`;
const HourLabel = styled.div`
    text-align: center;
    width: 24px;
    font-size: 10px;
    font-size: 14px;
    font-weight: 600;
    color: #6A7080;
`;
const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const DayLabel = styled.div`
  min-width: 120px;
  font-size: 14px;
  font-weight: 600;
  color: #6A7080;
`;
const Hours = styled.div`
  display: grid;
  grid-template-columns: repeat(24, 24px);
  gap: 4px;
`;
const Cell = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background-color: ${({ intensity }) =>  intensity === 0 ? "#424E70" : `#336CFF`};
`;

export default PublicationsAnalyticsPopup;