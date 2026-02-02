import { useMemo } from "react";
import styled from "styled-components";

import ChartHead from "@/components/Popup/Analytics/ChartHead";
import LineChart from "@/components/Analytics/LineChart";

import { useStatisticsStore } from "@/store/statisticsStore";
import { useAnalyticsFilterStore } from "@/store/analyticsFilterStore";

const AverageCoveragePopup = () => {
    const filter = useAnalyticsFilterStore(state => state.selectedFilter);

    const { averageCoveragePoints, averageCoverageLabels } = useStatisticsStore();

    const points = useMemo(() => {
        const numericFilter = Number(filter) || 1;
        return averageCoveragePoints.map(p => (Number(p) || 0) * numericFilter);
    }, [averageCoveragePoints, filter]);

	const labels = useMemo(() => averageCoverageLabels.map(l => l.short), [averageCoverageLabels]);
    const tooltipLabels = useMemo(() => averageCoverageLabels.map(l => l.full), [averageCoverageLabels]);

	return (
		<Container>
			<ChartHead />
			<ChartContainer>
				<LineChart
					points={points}
                    labels={labels}
                    tooltipLabels={tooltipLabels}
                    width={700}
                    height={300}
                    type="averageCoverag"
                    filter={filter}
				/>
			</ChartContainer>
			<ChartTitle>Вовлеченность аудитории <span>(ER)</span></ChartTitle>
			<ChartHead />
			<ChartContainer>
				<LineChart
					points={points}
					labels={labels}
					tooltipLabels={tooltipLabels}
					width={700}
					height={300}
					type="averageCoverag"
					filter={filter}
				/>
			</ChartContainer>
			<ChartTitle>Вовлеченность аудитории по просмотрам <span>(ERR)</span></ChartTitle>
			<ChartHead />
			<ChartContainer>
				<LineChart
					points={points}
					labels={labels}
					tooltipLabels={tooltipLabels}
					width={700}
					height={300}
					type="averageCoverag"
					filter={filter}
				/>
			</ChartContainer>
			<ChartTitle>Рекламная вовлеченность <span>(ERR24)</span></ChartTitle>
			<ChartHead />
			<ChartContainer>
				<LineChart
					points={points}
					labels={labels}
					tooltipLabels={tooltipLabels}
					width={700}
					height={300}
					type="averageCoverag"
					filter={filter}
				/>
			</ChartContainer>
		</Container>
	);
};

const Container = styled.div`
  	width: 100%;
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