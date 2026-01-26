import { useState } from "react";
import styled from "styled-components";

import BtnBase from "@/shared/BtnBase";
import CustomSelect from "@/shared/CustomSelect";

import Chart from "@/components/Popup/Analytics/Chart";
import ChartHead from "@/components/Popup/Analytics/ChartHead";

const subscriber = [
	{
		id: 1,
		date: "25 Декабря 2025, Ср",
		subscriptions: 502,
		unsubscriptions: 41,
	},
	{
		id: 2,
		date: "24 Декабря 2025, Вт",
		subscriptions: 430,
		unsubscriptions: 38,
	},
	{
		id: 3,
		date: "23 Декабря 2025, Пн",
		subscriptions: 610,
		unsubscriptions: 55,
	},
	{
		id: 4,
		date: "22 Декабря 2025, Вс",
		subscriptions: 390,
		unsubscriptions: 27,
	},
	{
		id: 5,
		date: "21 Декабря 2025, Сб",
		subscriptions: 720,
		unsubscriptions: 63,
	},
];

const AverageCoveragePopup = ({ data }) => {
	const [dateFilter, setDateFilter] = useState({ period: "", value: "" });
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
