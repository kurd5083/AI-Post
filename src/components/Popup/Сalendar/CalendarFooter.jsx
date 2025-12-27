import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";

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
          onClick={onAdd}
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