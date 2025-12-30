import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore"

const safeDate = (value) => {
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

const dayKeyUTC = (d) =>
  `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`;

export const CalendarFooter = ({
  events,
  selectedDate,
  isPending,
  onAdd,
}) => {
  const { changeContent } = usePopupStore();
  
  const selectedKey = dayKeyUTC(selectedDate);
  console.log(events, selectedDate, '1')

  const hasEvents = events.some((e) => {
    const d = safeDate(e.scheduledAt);
    if (!d) return false;

    return dayKeyUTC(d) === selectedKey;
  });
  console.log(hasEvents, '2')
  return (
    <>
      <CalendarButton>
        <BtnBase
          onClick={(e) => {
            e.stopPropagation();
            changeContent("create_calendar_event", "popup_window", {
              itemName: 'test',
              onSave: () => onAdd(),
            });
          }}
          disabled={isPending}
          $color="#AC60FD"
          $bg="#1F203D"
        >
          {isPending ? "Создание..." : "Добавить пост"}
        </BtnBase>
      </CalendarButton>

      <CalendarText>
        {hasEvents
          ? "Запланированные посты:"
          : "На этот день нету запланированных постов"}
      </CalendarText>
    </>
  );
};

const CalendarButton = styled.div`
  margin-top: 64px;
`;

const CalendarText = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin-top: 64px;
`;

export default CalendarFooter;