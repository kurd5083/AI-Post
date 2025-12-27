import styled from "styled-components";
import CustomSelectSec from "@/shared/CustomSelectSec";
import { dayOptions, MONTH_OPTIONS, YEAR_OPTIONS } from "@/data/calendarDatas";

export const CalendarHeader = ({ selectedDate, syncDate }) => {
  return (  
    <CalendarHead>
      <CustomSelectSec
  placeholder="День"
  options={dayOptions}
  value={dayOptions.find(o => o.value === selectedDate.getDate())}
  onChange={(o) =>
    syncDate(
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        o.value
      )
    )
  }
  width="165px"
  fs="22px"
/>

<CustomSelectSec
  placeholder="Месяц"
  options={MONTH_OPTIONS}
  value={MONTH_OPTIONS.find(o => o.value === selectedDate.getMonth())}
  onChange={(o) =>
    syncDate(
      new Date(
        selectedDate.getFullYear(),
        o.value,
        selectedDate.getDate()
      )
    )
  }
  width="180px"
  fs="22px"
/>

<CustomSelectSec
  placeholder="Год"
  options={YEAR_OPTIONS}
  value={YEAR_OPTIONS.find(o => o.value === selectedDate.getFullYear())}
  onChange={(o) =>
    syncDate(
      new Date(
        o.value,
        selectedDate.getMonth(),
        selectedDate.getDate()
      )
    )
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