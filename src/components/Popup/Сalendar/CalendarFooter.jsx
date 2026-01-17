import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore";
import { useCalendarPopupStore } from "@/store/calendarPopupStore";

const safeDate = (value) => {
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

const dayKeyUTC = (d) => `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`;

const CalendarFooter = ({ events, channelId }) => {
  const { changeContent } = usePopupStore();
  const { selectedDate } = useCalendarPopupStore();

  const selectedKey = dayKeyUTC(selectedDate);

  const hasEvents = events.some((e) => {
    const d = safeDate(e.scheduledAt);
    if (!d) return false;
    return dayKeyUTC(d) === selectedKey;
  });

  return (
    <>
      <CalendarButton>
        <BtnBase
          onClick={(e) => {
            e.stopPropagation();
            changeContent("add_post", "popup", { selectedDate, channelId });
          }}
          $color="#AC60FD"
          $bg="#1F203D"
        >
          Добавить пост
        </BtnBase>
      </CalendarButton>

      <CalendarText>
        {hasEvents ? "Запланированные посты:" : "На этот день нету запланированных постов"}
      </CalendarText>
    </>
  );
};

const CalendarButton = styled.div`
  margin-top: 64px;
  padding: 0 56px;
  @media(max-width: 1600px) { padding: 0 32px }
  @media(max-width: 768px) { padding: 0 24px }
`;

const CalendarText = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin-top: 64px;
  padding: 0 56px;
  @media(max-width: 1600px) { padding: 0 32px }
  @media(max-width: 768px) { padding: 0 24px }
`;

export default CalendarFooter;