import styled from "styled-components";
import useFadeOnScroll from "@/lib/useFadeOnScroll";

const statisticsData = [
	{
		title: "Подписки / Отписки за 24 часа",
		mainValue: "+ 44.490",
		mainSubValue: "Сегодня",
		details: [
			{ value: "- 500", label: "За неделю" },
			{ value: "- 2.257", label: "За месяц" }
		],
		points: [0, 60, 40, 100]
	},
	{
		title: "Средний охват 1 публикации",
		mainValue: "209.961",
		mainSubValue: null,
		details: [
			{ value: "7%", label: "ERR" },
			{ value: "6.5%", label: "ERR 24" }
		],
		points: [60, 30, 80, 20]
	},
	{
		title: "Комментарии / Лайки за 24 часа",
		mainValue: "+ 12.345",
		mainSubValue: "Сегодня",
		details: [
			{ value: "- 120", label: "За неделю" },
			{ value: "- 1.050", label: "За месяц" }
		],
		points: [60, 30, 80, 20]
	},
	{
		title: "Просмотры видео",
		mainValue: "98.456",
		mainSubValue: null,
		details: [
			{ value: "+ 5.678", label: "За неделю" },
			{ value: "+ 21.234", label: "За месяц" }
		],
		points: [60, 30, 80, 20]
	},
	{
		title: "Комментарии / Лайки за 24 часа",
		mainValue: "+ 12.345",
		mainSubValue: "Сегодня",
		details: [
			{ value: "- 120", label: "За неделю" },
			{ value: "- 1.050", label: "За месяц" }
		],
		points: [60, 30, 80, 20]
	},
	{
		title: "Просмотры видео",
		mainValue: "98.456",
		mainSubValue: null,
		details: [
			{ value: "+ 5.678", label: "За неделю" },
			{ value: "+ 21.234", label: "За месяц" }
		],
		points: [60, 30, 80, 20]
	}
];

const months = ["Январь", "Февраль", "Март", "Апрель"];

const StatisticsTab = () => {
	const { fadeVisible, ref } = useFadeOnScroll(20);
		const makeSmoothBezierPath = (values, height) => {
		const width = 200;
		const step = width / (values.length - 1);

		const maxValue = Math.max(...values);
		const pts = values.map((v, i) => [i * step, height - (v / maxValue) * height]);

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
	return (
		<StatisticsContainer $fadeVisible={fadeVisible} ref={ref}>
			{statisticsData.map((item, index) => (
				<StatisticsItem key={index}>
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
					<StatsChart>
						<StatsChartLine>
							<svg viewBox="0 0 200 100" preserveAspectRatio="none">
								<defs>
									<linearGradient id={`fadeStroke-${index}`} x1="0" x2="1" y1="0" y2="0">
										<stop offset="0%" stopColor="#1C243800" />
										<stop offset="50%" stopColor="#6A7080" />
										<stop offset="100%" stopColor="#1C243800" />
									</linearGradient>
								</defs>
								<path
									d={makeSmoothBezierPath(item.points, 100)}
									stroke={`url(#fadeStroke-${index})`}
									strokeWidth="2"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</StatsChartLine>

						<StatsChartGradient>
							<svg viewBox="0 0 200 100" preserveAspectRatio="none">
								<defs>
									<linearGradient id={`gradientFill-${index}`} x1="0" x2="0" y1="0" y2="1">
										<stop offset="0%" stopColor="#283046" />
										<stop offset="100%" stopColor="#1C243800"/>
									</linearGradient>
								</defs>
								<path
									d={`${makeSmoothBezierPath(item.points, 100)} L200,100 L0,100 Z`}
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

	${({ $forceHorizontal, $fadeVisible }) =>
		!$forceHorizontal &&
		`
      &::after {
        content: '';
        position: fixed;
        bottom: 0;
        height: 135px;
        width: 100%;
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
position: relative;
  flex: 1;
  border: 2px solid #2E3954;
  border-radius: 32px;
  padding: 40px 0 40px 40px;
  min-width: 500px;
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

const StatsChart = styled.div`
  position: absolute;
	bottom: 40px;
	right: 0;
  width: 350px;
`;
const StatsChartLine = styled.div`

`;
const StatsChartGradient = styled.div`
	margin-top: -150px;
`;
const StatsData = styled.div`
display: flex;
  position: absolute;
	bottom: 10px;
	right: 0;
  width: 350px;
	color: #6A7080;
	font-size: 10px;
	font-weight: 600;
	gap: 48px;
`;

export default StatisticsTab