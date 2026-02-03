import { useMemo } from "react";
import styled from "styled-components";

import ChartHead from "@/components/Popup/Analytics/ChartHead";
import LineChart from "@/components/Analytics/LineChart";

import { useAnalyticsStore } from "@/store/useAnalyticsStore";

const AverageCoveragePopup = () => {
    const { averageCoveragePoints, averageCoverageLabels, averageCoverageFilter } = useAnalyticsStore();

    const points = useMemo(() => {
        const numericFilter = Number(averageCoverageFilter) || 1;
        return averageCoveragePoints.map(p => (Number(p) || 0) * numericFilter);
    }, [averageCoveragePoints, averageCoverageFilter]);

    const labels = useMemo(() => averageCoverageLabels.map(l => l.short), [averageCoverageLabels]);
    const tooltipLabels = useMemo(() => averageCoverageLabels.map(l => l.medium), [averageCoverageLabels]);
    const hoverLabels = useMemo(() => averageCoverageLabels.map(l => l.full), [averageCoverageLabels]);
    return (
        <Container>
            <ChartHead content="average_coverage" />
            <ChartContainer>
                <LineChart
                    points={points}
                    labels={labels}
                    tooltipLabels={tooltipLabels}
                    hoverLabels={hoverLabels}
                    width={700}
                    height={300}
                    type="averageCoverage"
                    filter={averageCoverageFilter}
                    showGrid={true}
                />
            </ChartContainer>

            <ChartTitle>Вовлеченность аудитории <span>(ER)</span></ChartTitle>
            <ChartContainer>
                <LineChart
                    points={points}
                    labels={labels}
                    tooltipLabels={tooltipLabels}
                    width={700}
                    height={300}
                    type="averageCoverage"
                    filter={averageCoverageFilter}
                    showGrid={true}
                />
            </ChartContainer>

            <ChartTitle>Вовлеченность аудитории по просмотрам <span>(ERR)</span></ChartTitle>
            <ChartContainer>
                <LineChart
                    points={points}
                    labels={labels}
                    tooltipLabels={tooltipLabels}
                    width={700}
                    height={300}
                    type="averageCoverage"
                    filter={averageCoverageFilter}
                    showGrid={true}
                />
            </ChartContainer>

            <ChartTitle>Рекламная вовлеченность <span>(ERR24)</span></ChartTitle>
            <ChartContainer>
                <LineChart
                    points={points}
                    labels={labels}
                    tooltipLabels={tooltipLabels}
                    width={700}
                    height={300}
                    type="averageCoverage"
                    filter={averageCoverageFilter}
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
	margin: 64px 0 32px;
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

export default AverageCoveragePopup;