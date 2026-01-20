import { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import ArrowIcon from "@/icons/ArrowIcon";
import { useCalendarStore } from "@/store/calendarStore";

const weekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВСК"];

const CalendarBlock = () => {
	const today = new Date();
	const [currentDate, setCurrentDate] = useState(today);
	const { selectedDate, setSelectedDate } = useCalendarStore();

	useEffect(() => {
		const startISO = new Date(
			Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0)
		).toISOString();

		const endISO = new Date(
			Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999)
		).toISOString();

		setSelectedDate({ startISO, endISO });
	}, []);

	const days = useMemo(() => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();

		const firstDayOfMonth = new Date(year, month, 1);
		const lastDayOfMonth = new Date(year, month + 1, 0);
		const daysInMonth = lastDayOfMonth.getDate();

		const startOffset = (firstDayOfMonth.getDay() + 6) % 7;

		const result = [];

		for (let i = 0; i < startOffset; i++) result.push(null);

		for (let day = 1; day <= daysInMonth; day++) {
			const dateObj = new Date(year, month, day);

			const isActive =
				selectedDate &&
				dateObj.getFullYear() === new Date(selectedDate.startISO).getFullYear() &&
				dateObj.getMonth() === new Date(selectedDate.startISO).getMonth() &&
				dateObj.getDate() === new Date(selectedDate.startISO).getDate();

			result.push({ day, active: isActive });
		}

		return result;
	}, [currentDate, selectedDate]);

	const changeMonth = (direction) => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
		);
	};

	const handleDayClick = (day) => {
		const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

		const startISO = new Date(
			Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0)
		).toISOString();

		const endISO = new Date(
			Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999)
		).toISOString();

		setSelectedDate({ startISO, endISO });
	};

	const monthTitle = selectedDate
		? new Date(selectedDate.startISO).toLocaleDateString("ru-RU", {
			day: "numeric",
			month: "long",
			year: "numeric",
		})
		: currentDate.toLocaleDateString("ru-RU", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});


	return (
		<>
			<CalendarHeader>
				<CalendarTitle>{monthTitle}</CalendarTitle>
				<CalendarNav>
					<CalendarNavBtn onClick={() => changeMonth(-1)}>
						<ArrowIcon color="#D6DCEC" />
					</CalendarNavBtn>
					<CalendarNavBtn onClick={() => changeMonth(1)}>
						<ArrowIcon color="#D6DCEC" />
					</CalendarNavBtn>
				</CalendarNav>
			</CalendarHeader>

			<GridContainer>
				<WeekRow>
					{weekDays.map((day) => (
						<WeekDay key={day}>{day}</WeekDay>
					))}
				</WeekRow>

				<Grid>
					{days.map((item, idx) =>
						item ? (
							<DayCard
								key={idx}
								$active={item.active}
								onClick={() => handleDayClick(item.day)}
							>
								<DayNum>{item.day}</DayNum>
								{item.channels && <small>{item.channels}</small>}
							</DayCard>
						) : (
							<Empty key={idx} />
						)
					)}
				</Grid>
			</GridContainer>
		</>
	);
};

const CalendarHeader = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-left: 56px;

  @media(max-width: 1600px) { padding-left: 32px; }
  @media(max-width: 1400px) { padding: 0 32px; }
  @media(max-width: 768px) { padding: 0 24px; }
`;
const CalendarTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
`;
const CalendarNav = styled.div`
  display: flex;
  gap: 8px;
`;
const CalendarNavBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #336cff;
  &:first-child svg { transform: rotate(180deg); }
`;
const GridContainer = styled.div`
  overflow-x: auto;
  scrollbar-width: none;
  box-sizing: border-box;
  padding-left: 56px;

  @media(max-width: 1600px) { padding-left: 32px; }
  @media(max-width: 1400px) { padding: 0 32px; }
  @media(max-width: 768px) { padding: 0 24px; }
`;
const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 24px;
  gap: 8px;
`;
const WeekDay = styled.div`
  text-align: center;
  font-size: 12px;
  color: #6a7080;
  font-weight: 600;
  @media(max-width: 1400px) { min-width: 112px; }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 24px 16px;
  @media(max-width: 1600px) { gap: 24px 8px; }
	@media(max-width: 1400px) { min-width: 830px; }
`;
const DayCard = styled.div`
  box-sizing: border-box;
  height: 88px;
  border-radius: 16px;
  padding: 16px;
  background: ${({ $active }) => ($active ? "#336CFF1A" : "transparent")};
  border: 2px solid ${({ $active }) => ($active ? "#336CFF" : "#3E4453")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  small { font-size: 14px; font-weight: 700; }
`;
const DayNum = styled.span`
  font-size: 16px;
  font-weight: 700;
`;
const Empty = styled.div`height: 88px;`;

export default CalendarBlock;
