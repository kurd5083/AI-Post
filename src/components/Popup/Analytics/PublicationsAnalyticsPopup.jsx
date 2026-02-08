import { useMemo } from "react";
import styled from "styled-components";

import DayBarChart from "@/components/Analytics/DayBarChart";
import ChartHead from "@/components/Popup/Analytics/ChartHead";

import { useAnalyticsStore } from "@/store/useAnalyticsStore";

const PublicationsAnalyticsPopup = () => {
    const { postsByPeriodPoints, postsByPeriodLabels, postsByPeriodHourly, postsByPeriodFilter } = useAnalyticsStore();
    
    const selectedFilter = postsByPeriodFilter;
    
    const labels = useMemo(() => postsByPeriodLabels.map((l) => l.short), [postsByPeriodLabels]);
    const hoverLabels = useMemo(() => postsByPeriodLabels.map((l) => l.full), [postsByPeriodLabels]);

    const hours = Array.from({ length: 24 }, (_, i) => i);

    const formatRuDate = (dateStr) => {
        const date = new Date(dateStr);

        const day = date.getDate();

        const month = new Intl.DateTimeFormat("ru-RU", {
            month: "long",
        }).format(date);

        const weekday = new Intl.DateTimeFormat("ru-RU", {
            weekday: "short",
        }).format(date);

        return `${day} ${month[0].toUpperCase() + month.slice(1)}, ${weekday}`;
    };

    return (
        <Container>
            <ChartHead content="publications_analytics" />

            <ChartContainer>
                <DayBarChart
                    points={postsByPeriodPoints}
                    labels={labels}
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
                {postsByPeriodHourly.map((day, i) => (
                    <Row key={i}>
                        <DayLabel>{formatRuDate(day.date)}</DayLabel>
                        <Hours>
                            {day.hourly.map((val, j) => (
                                <Cell key={j} intensity={val.posts_count} >{val.posts_count > 0 && val.posts_count}</Cell>
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
`;
const ChartContainer = styled.div`
    display: grid;
    align-items: end;
    justify-items: start;
    grid-template-columns: max-content 1fr;
    grid-template-rows: 300px 30px;
    gap: 0 10px;
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
  padding: 0 56px 30px;
  max-height: 230px;
  overflow-y: auto;
  scrollbar-width: none;

  @media(max-width: 1600px) {
    padding: 0 32px 30px;
  }
  @media(max-width: 768px) {
    padding: 0 24px 30px;
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background-color: ${({ intensity }) => intensity === 0 ? "#424E70" : `#336CFF`};
    font-weight: 700;
    font-size: 16px;
`;

export default PublicationsAnalyticsPopup;