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
		]
	},
	{
		title: "Средний охват 1 публикации",
		mainValue: "209.961",
		mainSubValue: null,
		details: [
			{ value: "7%", label: "ERR" },
			{ value: "6.5%", label: "ERR 24" }
		]
	},
	{
		title: "Комментарии / Лайки за 24 часа",
		mainValue: "+ 12.345",
		mainSubValue: "Сегодня",
		details: [
			{ value: "- 120", label: "За неделю" },
			{ value: "- 1.050", label: "За месяц" }
		]
	},
	{
		title: "Просмотры видео",
		mainValue: "98.456",
		mainSubValue: null,
		details: [
			{ value: "+ 5.678", label: "За неделю" },
			{ value: "+ 21.234", label: "За месяц" }
		]
	},
	{
		title: "Комментарии / Лайки за 24 часа",
		mainValue: "+ 12.345",
		mainSubValue: "Сегодня",
		details: [
			{ value: "- 120", label: "За неделю" },
			{ value: "- 1.050", label: "За месяц" }
		]
	},
	{
		title: "Просмотры видео",
		mainValue: "98.456",
		mainSubValue: null,
		details: [
			{ value: "+ 5.678", label: "За неделю" },
			{ value: "+ 21.234", label: "За месяц" }
		]
	}
];

const StatisticsTab = () => {
	const { fadeVisible, ref } = useFadeOnScroll(20);

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
export default StatisticsTab
