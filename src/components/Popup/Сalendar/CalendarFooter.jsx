import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";

export const CalendarFooter = ({
  events,
  selectedDate,
  isPending,
  onAdd,
}) => {
  const hasEvents = events.some(
    (e) =>
      new Date(e.scheduledAt).toDateString() ===
      selectedDate.toDateString()
  );

  return (
    <>
      <CalendarButton>
        <BtnBase onClick={onAdd} disabled={isPending}>
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