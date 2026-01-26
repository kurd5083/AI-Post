import { useRef, useState, useEffect } from "react";
import styled from "styled-components";

import BtnBase from "@/shared/BtnBase";

import useFadeOnScroll from "@/lib/useFadeOnScroll";

import { usePopupStore } from "@/store/popupStore"

const statisticsData = [
  {
    title: "Рост количества подписчиков",
    mainValue: "+ 3.421",
    mainSubValue: "Сегодня",
    details: [
      { value: "- 150", label: "За неделю" },
      { value: "+ 1.200", label: "За месяц" }
    ],
    points: [0, 20, 35, 25, 50, 40, 70],
		content: 'subscriber_growth'
  },
  {
    title: "Динамика постов в канале",
    mainValue: "15.342",
    mainSubValue: null,
    details: [
      { value: "+ 5%", label: "Рост за неделю" },
      { value: "+ 12%", label: "Рост за месяц" }
    ],
    points: [60, 50, 70, 55, 80, 60, 90],
	content: 'dynamics_posts'
  },
  {
    title: "Средний охват",
    mainValue: "+ 7.890",
    mainSubValue: "Сегодня",
    details: [
      { value: "- 200", label: "За неделю" },
      { value: "+ 1.500", label: "За месяц" }
    ],
    points: [40, 50, 60, 70, 65, 80, 90],
	content: 'average_coverage'
  },
  {
    title: "Просмотры видео",
    mainValue: "123.456",
    mainSubValue: null,
    details: [
      { value: "+ 4.321", label: "За неделю" },
      { value: "+ 15.000", label: "За месяц" }
    ],
    points: [50, 60, 80, 90, 70, 85, 100],
		content: 'subscriber_growth'
  },
  {
    title: "Клики по ссылкам",
    mainValue: "5.678",
    mainSubValue: "Сегодня",
    details: [
      { value: "- 100", label: "За неделю" },
      { value: "+ 500", label: "За месяц" }
    ],
    points: [20, 30, 25, 40, 50, 45, 60],
		content: 'subscriber_growth'
  },
  {
    title: "Конверсия из просмотров в подписку",
    mainValue: "8,7%",
    mainSubValue: null,
    details: [
      { value: "+ 0,5%", label: "За неделю" },
      { value: "+ 1,2%", label: "За месяц" }
    ],
    points: [50, 55, 60, 65, 60, 70, 75] ,
		content: 'subscriber_growth'
  }
];

const months = ["Январь", "Февраль", "Март", "Апрель"];

const StatisticsTab = () => {
	const { openPopup } = usePopupStore();
	const [containerWidth, setContainerWidth] = useState(0);

	const containerRef = useRef();
	const svgRefs = useRef([]);
	const { fadeVisible, ref } = useFadeOnScroll(20);
	const [hoverData, setHoverData] = useState({ index: null, x: 0, y: 0, value: 0 });
	useEffect(() => {
		if (!containerRef.current) return;

		const updateWidth = () => {
			let width = containerRef.current.offsetWidth;

			if (window.innerWidth < 1600) {
				width -= 32 * 2;
			} else {
				width -= 52 * 2;
			}

			setContainerWidth(width);
		};

		updateWidth();
		window.addEventListener("resize", updateWidth);

		return () => window.removeEventListener("resize", updateWidth);
	}, []);

	const makeSmoothBezierPath = (values, height) => {
		const width = 300;
		const step = width / (values.length - 1);

		const pts = values.map((v, i) => [i * step, height - (v / 100) * height]);

		if (pts.length < 2) return "";

		let d = `M${pts[0][0]},${pts[0][1]}`;
		for (let i = 1; i < pts.length; i++) {
			const [x0, y0] = pts[i - 1];
			const [x1, y1] = pts[i];
			const cp1x = x0 + (x1 - x0) / 2;
			const cp1y = y0;
			const cp2x = x0 + (x1 - x0) / 2;
			const cp2y = y1;
			d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${x1},${y1}`;
		}
		return d;
	};
	const handleMouseMove = (e, points, svg, chartIndex) => {
		if (!svg) return;

		const rect = svg.getBoundingClientRect();
		const x = e.clientX - rect.left;

		const step = 300 / (points.length - 1);
		const index = Math.round(x / step);
		const clampedIndex = Math.max(0, Math.min(points.length - 1, index));

		const svgHeight = 160;
		const maxScale = 100;
		const y = svgHeight - (points[clampedIndex] / maxScale) * svgHeight;
		
		setHoverData({
			index: clampedIndex,
			chartIndex,
			x: clampedIndex * step,
			y,
			value: points[clampedIndex],
		});
	};
	const handleMouseLeave = () => setHoverData({ index: null, x: 0, y: 0, value: 0 });
	const getTooltipY = (y) => {
		const topPadding = 18;
		const bottomPadding = 18;
		const height = 160;

		if (y < topPadding) return y + 20;
		if (y > height - bottomPadding) return y - 20;

		return y - 10;
	};

	return (
		<StatisticsContainer
			ref={(el) => {
				if (ref) ref.current = el;
				containerRef.current = el;
			}}
			$fadeVisible={fadeVisible}
			$containerWidth={containerWidth}
		>
			{statisticsData.map((item, index) => (
				<StatisticsItem key={index}>
					<ButtonMore>
						<BtnBase $color="#336CFF" $bg="#161F37" $padding="12px 24px" onClick={() => openPopup(item.content, "popup")} >Подробнее</BtnBase>
					</ButtonMore>
					<ItemLeft>
						<ItemTitle>{item.title}</ItemTitle>
						<StatsCardMainValue>
							{item.mainValue}
							{item.mainSubValue && <span>{item.mainSubValue}</span>}
						</StatsCardMainValue>
						<StatsCardDetails>
							{item.details.map((detail, i) => (
								<StatsCardDetailItem key={i}>
									{detail.value} <span>{detail.label}</span>
								</StatsCardDetailItem>
							))}
						</StatsCardDetails>
					</ItemLeft>
					<StatsChartContainer>
						<StatsYAxis>
							{[100, 75, 50, 25, 0].map((val, i) => (
								<span key={i}>
									{val}
								</span>
							))}
						</StatsYAxis>
						<StatsChart onMouseMove={(e) => handleMouseMove(e, item.points, svgRefs.current[index], index)}
							onMouseLeave={handleMouseLeave}	>
							<StatsChartLine>
								<svg
									ref={(el) => (svgRefs.current[index] = el)}
									viewBox="-10 0 325 160"
									preserveAspectRatio="none"
								>
									<defs>
										<linearGradient id={`fadeStroke-${index}`} x1="0" x2="1" y1="0" y2="0">
											<stop offset="0%" stopColor="#94b2ffc3" />
											<stop offset="50%" stopColor="#336dffd8" />
											<stop offset="100%" stopColor="#336dffac" />
										</linearGradient>
									</defs>
									<path
										d={makeSmoothBezierPath(item.points, 160)}
										stroke={`url(#fadeStroke-${index})`}
										strokeWidth="3"
										fill="none"
									/>

									{hoverData.index !== null && hoverData.chartIndex === index && (
										<g>
											<circle
												cx={hoverData.x}
												cy={hoverData.y}
												r="6"
												fill="#336CFF"
												stroke="#FFFFFF"
												strokeWidth="3"
											/>
											<text
												x={hoverData.x}
												y={getTooltipY(hoverData.y)}
												textAnchor="middle"
												fontWeight={600}
												fontSize="14"
												fill="#FFF"
											>
												{hoverData.value}
											</text>
											<line
												x1={hoverData.x}
												y1={hoverData.y}
												x2={hoverData.x}
												y2={185}
												stroke="#FFFFFF"
												strokeWidth="1"
												strokeDasharray="4 2"
											/>
										</g>
									)}
								</svg>
							</StatsChartLine>

							<StatsChartGradient>
								<svg viewBox="-10 0 325 160" preserveAspectRatio="none">
									<defs>
										<linearGradient id={`gradientFill-${index}`} x1="0" x2="0" y1="0" y2="1">
											<stop offset="0%" stopColor="#193169" />
											<stop offset="100%" stopColor="#13192ac7" />
										</linearGradient>
									</defs>
									<path
										d={`${makeSmoothBezierPath(item.points, 160)} L300,150 L0,150 Z`}
										fill={`url(#gradientFill-${index})`}
									/>
								</svg>
							</StatsChartGradient>
						</StatsChart>
						<StatsData>
							{months.map((month, i) => (
								<span key={i} style={{ left: `${(i / (months.length - 1)) * 100}%` }}>
									{month}
								</span>
							))}
						</StatsData>
					</StatsChartContainer>
				</StatisticsItem>
			))}
		</StatisticsContainer>
	)
}
const StatisticsContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 0 56px 30px;
	max-height: 450px;
	overflow-y: auto;
  scrollbar-width: none;

	@media(max-width: 1600px) { 
    padding: 0 32px 30px 
  }	
  @media(max-width: 768px) { 
    padding: 0 24px 30px
  }

	${({ $forceHorizontal, $fadeVisible, $containerWidth }) =>
		!$forceHorizontal &&
		`
      &::after {
        content: '';
        position: fixed;
        bottom: 0;
        height: 135px;
        width: ${$containerWidth}px;
        background: linear-gradient(to top, #131826, transparent);
        backdrop-filter: blur(8px);
        mask-image: linear-gradient(to top, black 50%, transparent);
        transition: opacity 0.2s;
        opacity: ${$fadeVisible ? 1 : 0};
        pointer-events: none;
        z-index: 1;
        
        @media(max-width: 1400px) {
          display: none;
        }
      }
  `}
`;
const StatisticsItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	gap: 30px;
	position: relative;
  flex: 1;
  border: 2px solid #2E3954;
  border-radius: 32px;
  padding: 40px 30px 24px 40px;
`;
const ButtonMore = styled.div`
	position: absolute;
	right: 24px;
	top: 24px;
	z-index: 10;
`;
const ItemLeft = styled.div`
	min-width: 230px;
	height: 100%;
`;

const ItemTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
`;
const StatsCardMainValue = styled.p`
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 36px;
  font-weight: 800;

  span {
    font-size: 14px;
    font-weight: 600;
    color: #6A7080;
  }
`;
const StatsCardDetails = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const StatsCardDetailItem = styled.p`
  display: flex;
  gap: 24px;
  font-weight: 800;
  span {
    font-size: 14px;
    font-weight: 600;
    color: #6A7080;
  }
`;
const StatsChartContainer = styled.div`
	display: grid;
	align-items: end;
	justify-items: start;
	grid-template-columns: 30px 1fr;
  grid-template-rows: 160px 30px;
`;
const StatsYAxis = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
	grid-column:  1;
  grid-row: 1;

  span {
    font-size: 10px;
    font-weight: 600;
    color: #6A7080;
  }
`;
const StatsChart = styled.div`
	grid-column:  2;
  grid-row: 1;
  width: 300px;
	height: 160px;
`;
const StatsChartLine = styled.div`
	margin-right: -15px;
 	path {
    filter: drop-shadow(0 0 6px #336dffae);
  }
`;
const StatsChartGradient = styled.div`
	margin-right: -15px;
	margin-top: -140px;
`;
const StatsData = styled.div`
	text-transform: uppercase;
	box-sizing: border-box;
	grid-column:  2;
  grid-row: 2;
	display: flex;
	justify-content: space-between;
  width: 300px;
	color: #6A7080;
	font-size: 10px;
	font-weight: 600;
`;

export default StatisticsTab