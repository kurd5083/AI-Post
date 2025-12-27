import styled from "styled-components";
import arrow from "@/assets/arrow.svg";
import { DAYS_OF_WEEK } from "@/data/calendarDatas";
import { formatRange } from "@/lib/generateWeek";

export const CalendarWeek = ({
  currentWeek,
  selectedDate,
  startDate,
  endDate,
  changeWeek,
  syncDate,
}) => (
  <>
    <Header>
      <NavButtonLeft onClick={() => changeWeek(-1)}>
        <img src={arrow} alt="arrow icon" />
      </NavButtonLeft>

      <DateDisplay>
        {startDate && endDate ? formatRange(startDate, endDate) : ""}
      </DateDisplay>

      <NavButton onClick={() => changeWeek(1)}>
        <img src={arrow} alt="arrow icon" />
      </NavButton>
    </Header>

    <WeekGrid>
      {currentWeek.map((day, i) => {
        const selected =
          day.toDateString() === selectedDate.toDateString();

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

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 64px;
`;

const DateDisplay = styled.h1`
  font-size: 48px;
  font-weight: 700;
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
  gap: 56px;
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