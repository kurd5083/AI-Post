import { useMemo } from "react";
import styled from "styled-components";

import ChartHead from "@/components/Popup/Analytics/ChartHead";
import LineChart from "@/components/Analytics/LineChart";

import { useAnalyticsStore } from "@/store/useAnalyticsStore";

const AverageCoveragePopup = () => {
    const { averageCoverageAvgPoints, averageCoverageErPoints, averageCoverageErr24Points, averageCoverageErrPoints, averageCoverageAvgLabels,
        averageCoverageAvgFilter, averageCoverageErFilter, averageCoverageErrFilter, averageCoverageErr24Filter  } = useAnalyticsStore();

    const labels = useMemo(() => averageCoverageAvgLabels.map(l => l.short), [averageCoverageAvgLabels]);
    const tooltipLabels = useMemo(() => averageCoverageAvgLabels.map(l => l.medium), [averageCoverageAvgLabels]);
    const hoverLabels = useMemo(() => averageCoverageAvgLabels.map(l => l.full), [averageCoverageAvgLabels]);

    return (
        <Container>
            <ChartHead content="average_coverage" />
            <ChartContainer>
                <LineChart
                    points={averageCoverageAvgPoints}
                    labels={labels}
                    tooltipLabels={tooltipLabels}
                    hoverLabels={hoverLabels}
                    width={700}
                    height={300}
                    type="averageCoverage"
                    filter={averageCoverageAvgFilter}
                    showGrid={true}
                />
            </ChartContainer>

            <ChartTitle>Вовлеченность аудитории <span>(ER)</span></ChartTitle>
            <ChartContainer>
                <LineChart
                    points={averageCoverageErPoints}
                    labels={labels}
                    tooltipLabels={tooltipLabels}
                    width={700}
                    height={300}
                    type="er"
                    showGrid={true}
                />
            </ChartContainer>

            <ChartTitle>Вовлеченность аудитории по просмотрам <span>(ERR)</span></ChartTitle>
            <ChartContainer>
                <LineChart
                    points={averageCoverageErrPoints}
                    labels={labels}
                    tooltipLabels={tooltipLabels}
                    width={700}
                    height={300}
                    type="err"
                    showGrid={true}
                />
            </ChartContainer>

            <ChartTitle>Рекламная вовлеченность <span>(ERR24)</span></ChartTitle>
            <ChartContainer>
                <LineChart
                    points={averageCoverageErr24Points}
                    labels={labels}
                    tooltipLabels={tooltipLabels}
                    width={700}
                    height={300}
                    type="err24"
                    showGrid={true}
                />
            </ChartContainer>
        </Container>
    );
};

const Container = styled.div`
  	width: 100%;
    padding-bottom: 30px;
`;
const ChartTitle = styled.h2`
	margin: 84px 0 32px;
  	font-size: 32px;
	line-height: 32px;
  	font-weight: 700;
	padding: 0 56px;

	@media(max-width: 1600px) { padding: 0 32px; }
	@media(max-width: 768px) { padding: 0 24px; }

	span {
		color: #6A7080;
	}
`;
const ChartContainer = styled.div`
 	display: grid;
	align-items: end;
	justify-items: start;
	grid-template-columns: 30px 1fr;
    grid-template-rows: 300px 30px;
	padding: 0 56px;
	margin-top: 40px;

	@media(max-width: 1600px) { 
		padding: 0 32px; 
	}
	@media(max-width: 768px) { 
		padding: 0 24px; 
	}
`;

export default AverageCoveragePopup;