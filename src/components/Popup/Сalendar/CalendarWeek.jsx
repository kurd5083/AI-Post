import styled from "styled-components";

import ArrowIcon from "@/icons/ArrowIcon";

import { formatRange } from "@/lib/generateWeek";

import { DAYS_OF_WEEK } from "@/data/calendarDatas";

import { useCalendarPopupStore } from "@/store/calendarPopupStore";

const CalendarWeek = ({ currentWeek, startDate, endDate }) => {
  const { selectedDate, syncDate, changeWeek } = useCalendarPopupStore();

  return (
    <>
      <Header>
        <NavButtonLeft onClick={() => changeWeek(-1)}>
          <ArrowIcon color="#D6DCEC" />
        </NavButtonLeft>

        <DateDisplay>
          {startDate && endDate ? formatRange(startDate, endDate) : ""}
        </DateDisplay>

        <NavButton onClick={() => changeWeek(1)}>
          <ArrowIcon color="#D6DCEC" />
        </NavButton>
      </Header>

      <WeekGrid>
        {currentWeek.map((day, i) => {
          const selected = day.toDateString() === selectedDate.toDateString();
          return (
            <DayColumn key={i}>
              <DayOfWeek>{DAYS_OF_WEEK[i]}</DayOfWeek>
              <DayCell isSelected={selected} onClick={() => syncDate(day)}>
                <DayNumber isSelected={selected}>{day.getDate()}</DayNumber>
              </DayCell>
            </DayColumn>
          );
        })}
      </WeekGrid>
    </>
  );
};
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 64px;
  padding: 0 56px;
  @media(max-width: 1600px) { padding: 0 32px }
  @media(max-width: 768px) { padding: 0 24px }
`;

const DateDisplay = styled.h1`
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  @media (max-width: 991px) {
    font-size: 32px;
  }
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 2px solid #6a7080;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    border-color: #ac60fd;
  }
`;
const NavButtonLeft = styled(NavButton)`
  transform: rotate(180deg);
`;
const WeekGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 56px;
  padding: 0 56px;
  @media(max-width: 1600px) { padding: 0 32px }
  @media(max-width: 768px) { padding: 0 24px }
`;

const DayColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const DayOfWeek = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #6a7080;
  margin-bottom: 24px;
`;

const DayCell = styled.div`
  cursor: pointer;
`;

const DayNumber = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ isSelected }) => (isSelected ? "#AC60FD" : "inherit")};
`;

export default CalendarWeek;