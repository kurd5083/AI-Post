import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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
    <CalendarHead spaceBetween={32} slidesPerView="auto" grabCursor>
      <CalendarHeadSlide>
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
      </CalendarHeadSlide>
      <CalendarHeadSlide>
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
      </CalendarHeadSlide>
      <CalendarHeadSlide>
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
      </CalendarHeadSlide>
    </CalendarHead>
  );
};

const CalendarHead = styled(Swiper)`
  display: flex;
  margin-bottom: 48px;
  padding: 0 56px;
  z-index: 0;
  overflow: visible !important;
  @media(max-width: 1600px) { padding: 0 32px}
  @media(max-width: 768px) { padding: 0 24px}
`;
const CalendarHeadSlide = styled(SwiperSlide)`
  width: fit-content;
  min-width: 120px;
`;
export default CalendarHeader;