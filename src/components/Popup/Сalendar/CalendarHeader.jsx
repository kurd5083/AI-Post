import styled from "styled-components";
import CustomSelectSec from "@/shared/CustomSelectSec";
import { MONTH_OPTIONS, YEAR_OPTIONS } from "@/data/calendarDatas";

const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();

export const CalendarHeader = ({ currentDate, selectedDate, syncDate }) => {
  const dayOptions = Array.from(
    { length: getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()) },
    (_, i) => ({ value: i + 1, label: String(i + 1) })
  );

  return (
    <CalendarHead>
      <CustomSelectSec
  placeholder="День"
  options={dayOptions}
  value={selectedDate.getDate()} // передаем число, а не объект
  onChange={(val) =>
    syncDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), val))
  }
  width="165px"
  fs="22px"
/>

<CustomSelectSec
  placeholder="Месяц"
  options={MONTH_OPTIONS}
  value={selectedDate.getMonth()} // передаем число месяца
  onChange={(val) =>
    syncDate(new Date(currentDate.getFullYear(), val, selectedDate.getDate()))
  }
  width="180px"
  fs="22px"
/>

<CustomSelectSec
  placeholder="Год"
  options={YEAR_OPTIONS}
  value={selectedDate.getFullYear()} // передаем число года
  onChange={(val) =>
    syncDate(new Date(val, currentDate.getMonth(), selectedDate.getDate()))
  }
  width="165px"
  fs="22px"
/>
    </CalendarHead>
  );
};

const CalendarHead = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 48px;

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

export default CalendarHeader;