import { useState } from "react";
import styled from "styled-components";

import Chart from "@/components/Popup/Analytics/Chart";
import ChartHead from "@/components/Popup/Analytics/ChartHead";
import { useGetAvgReach } from "@/lib/analytics/useGetAvgReach";

const AverageCoveragePopup = ({ data }) => {
	const { avgReach, avgReachLoading } = useGetAvgReach({
		channelId: 1,
		group: "day",
	});
	console.log(avgReach) 
	return (
		<Container>
			<ChartHead />
			<Chart data={data} />
			<ChartTitle>Средний рекламный охват публикации</ChartTitle>
			<ChartHead />
			<Chart data={data} />
		</Container>
	);
};

const Container = styled.div`
  width: 100%;
`;
const ChartTitle = styled.h2`
	margin: 64px 0 32px;
  font-size: 48px;
	line-height: 48px;
  font-weight: 700;
	padding: 0 56px;

  @media(max-width: 1600px) { padding: 0 32px; }
  @media(max-width: 768px) { padding: 0 24px; }
`;


export default AverageCoveragePopup;
