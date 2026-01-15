import styled from "styled-components";
import CustomSelectSec from "@/shared/CustomSelectSec";
import { MONTH_OPTIONS, YEAR_OPTIONS } from "@/data/calendarDatas";
import { useCalendarPopupStore } from "@/store/calendarPopupStore";

const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();

const CalendarHeader = () => {
  const { selectedDate, syncDate } = useCalendarPopupStore();

  const dayOptions = Array.from(
    { length: getDaysInMonth(selectedDate.getFullYear(), selectedDate.getMonth()) },
    (_, i) => ({ value: i + 1, label: String(i + 1) })
  );

  return (
    <CalendarHead>
      <CustomSelectSec
        placeholder="День"
        options={dayOptions}
        value={selectedDate.getDate()}
        onChange={(o) => {
          const newDate = new Date(Date.UTC(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            o.value
          ));
          syncDate(newDate);
        }}
        width="165px"
        fs="22px"
      />

      <CustomSelectSec
        placeholder="Месяц"
        options={MONTH_OPTIONS}
        value={selectedDate.getMonth()}
        onChange={(o) => {
          const newDate = new Date(Date.UTC(
            selectedDate.getFullYear(),
            o.value,
            selectedDate.getDate()
          ));
          syncDate(newDate);
        }}
        width="180px"
        fs="22px"
      />

      <CustomSelectSec
        placeholder="Год"
        options={YEAR_OPTIONS}
        value={selectedDate.getFullYear()}
        onChange={(o) => {
          const newDate = new Date(Date.UTC(
            o.value,
            selectedDate.getMonth(),
            selectedDate.getDate()
          ));
          syncDate(newDate);
        }}
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