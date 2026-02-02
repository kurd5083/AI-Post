import { useMemo } from "react";
import styled from "styled-components";

import LineChart from "@/components/Analytics/LineChart";
import ChartHead from "@/components/Popup/Analytics/ChartHead";

import { useStatisticsStore } from "@/store/statisticsStore";
import { useAnalyticsFilterStore } from "@/store/analyticsFilterStore";

const AverageAdvertisingPopup = () => {
    const filter = useAnalyticsFilterStore(state => state.selectedFilter);

    const { adReachPoints, adReachLabels } = useStatisticsStore();

    const points = useMemo(() => {
        const numericFilter = Number(filter) || 1;
        return adReachPoints.map(p => (Number(p) || 0) * numericFilter);
    }, [adReachPoints, filter]);

    const labels = useMemo(() => adReachLabels.map(l => l.short), [adReachLabels]);
    const tooltipLabels = useMemo(() => adReachLabels.map(l => l.full), [adReachLabels]);

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
                    type="adReach"
                    filter={filter}
                />
            </ChartContainer>
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

export default AverageAdvertisingPopup;
