import styled from "styled-components";

import DayBarChart from "@/components/Analytics/DayBarChart";
import ChartHead from "@/components/Popup/Analytics/ChartHead";
import { usePopupStore } from "@/store/popupStore";
import { useAnalyticsFilterStore } from "@/store/analyticsFilterStore";

const PublicationsAnalyticsPopup = () => {
    const { popup } = usePopupStore();

    const points = popup?.data?.points || [];
    const labels = popup?.data?.labels || [];
    const tooltipLabels = popup?.data?.tooltipLabels || [];
    const width = popup?.data?.width || 400;
    const type = popup?.data?.type || "";
    const filter = popup?.data?.filter || "";

    return (
        <Container>
            <ChartHead />
            <ChartContainer>
                <DayBarChart
                    points={points}
                    labels={labels}
                    tooltipLabels={tooltipLabels}
                    width={width}
                    height={300}
                    type={type}
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
    padding: 0 56px;
    margin-top: 40px;

    @media(max-width: 1600px) { 
        padding: 0 32px; 
    }
    @media(max-width: 768px) { 
        padding: 0 24px; 
    }
`;

export default PublicationsAnalyticsPopup;