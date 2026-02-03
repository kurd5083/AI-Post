import { useMemo } from "react";
import styled from "styled-components";

import LineChart from "@/components/Analytics/LineChart";
import ChartHead from "@/components/Popup/Analytics/ChartHead";

import { useAnalyticsStore } from "@/store/useAnalyticsStore";

const AverageAdvertisingPopup = () => {
    const { adReachPoints, adReachLabels, dayFilter } = useAnalyticsStore();
    const selectedFilter = dayFilter;

    const points = useMemo(() => adReachPoints.map(p => (Number(p) || 0) * (Number(selectedFilter) || 1)), [adReachPoints, selectedFilter]);
    
    const labels = useMemo(() => adReachLabels.map(l => l.short), [adReachLabels]);
    const tooltipLabels = useMemo(() => adReachLabels.map(l => l.medium), [adReachLabels]);
    const hoverLabels = useMemo(() => adReachLabels.map(l => l.full), [adReachLabels]);

    return (
        <Container>
            <ChartHead content="average_advertising"/>
            <ChartContainer>
                <LineChart
                    points={points} 
                    labels={labels} 
                    tooltipLabels={tooltipLabels}
                    hoverLabels={hoverLabels} 
                    width={700}
                    height={300}
                    type="adReach"
                    filter={selectedFilter}
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
