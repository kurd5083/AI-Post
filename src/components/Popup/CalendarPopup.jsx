import styled from "styled-components";
import { useState, useEffect } from "react";
import CustomSelectSec from "@/shared/CustomSelectSec";
import BtnBase from "@/shared/BtnBase";
import arrow from "@/assets/arrow.svg";

import { usePopupStore } from "@/store/popupStore";
import { useCreateCalendarEvent } from "@/lib/calendar/useCreateCalendarEvent";
import { useCalendarEventsByRange } from "@/lib/calendar/useCalendarEventsByRange";

/* ================= CONSTANTS ================= */

const DAYS_OF_WEEK = [
  "ПОНЕДЕЛЬНИК",
  "ВТОРНИК",
  "СРЕДА",
  "ЧЕТВЕРГ",
  "ПЯТНИЦА",
  "СУББОТА",
  "ВОСКРЕСЕНЬЕ",
];

const MONTH_OPTIONS = [
  "Январь", "Февраль", "Март", "Апрель",
  "Май", "Июнь", "Июль", "Август",
  "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
].map((label, value) => ({ value, label }));

const YEAR_OPTIONS = [2024, 2025, 2026, 2027].map((y) => ({
  value: y,
  label: String(y),
}));

/* ================= UTILS ================= */

const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();

const getDayOptions = (y, m) =>
  Array.from({ length: getDaysInMonth(y, m) }, (_, i) => ({
    value: i + 1,
    label: String(i + 1),
  }));

const generateWeek = (date) => {
  const monday = new Date(date);
  const diff = date.getDay() === 0 ? -6 : 1 - date.getDay();
  monday.setDate(date.getDate() + diff);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
};

/* ================= COMPONENT ================= */

const CalendarPopup = () => {
  const { popup } = usePopupStore();
  const channelId = popup?.data?.channelId;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState([]);

  useEffect(() => {
    setCurrentWeek(generateWeek(currentDate));
  }, [currentDate]);

  /* ====== dates for API ====== */
  const startDate = currentWeek[0]?.toISOString();
  const endDate = currentWeek[6]
    ? new Date(
        new Date(currentWeek[6]).setHours(23, 59, 59, 999)
      ).toISOString()
    : null;

  /* ====== queries ====== */
  const { data: events = [] } = useCalendarEventsByRange({
    channelId,
    startDate,
    endDate,
  });

  const { mutate: createEvent, isPending } =
    useCreateCalendarEvent();

  /* ====== helpers ====== */

  const hasEventsOnDay = (date) =>
    events.some(
      (e) =>
        new Date(e.scheduledAt).toDateString() ===
        date.toDateString()
    );

  const changeWeek = (dir) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + dir * 7);
    setCurrentDate(d);
  };

  const syncDate = (date) => {
    setSelectedDate(date);
    if (
      date < currentWeek[0] ||
      date > currentWeek[6]
    ) {
      setCurrentDate(date);
    }
  };

  const handleAddPost = () => {
    createEvent({
      channelId,
      eventType: "POST_SCHEDULED",
      title: "Scheduled Post",
      scheduledAt: selectedDate.toISOString(),
      timezone: "UTC",
      metadata: { source: "calendar" },
    });
  };

  const dayOptions = getDayOptions(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  /* ================= RENDER ================= */

  return (
    <div>
      <CalendarHead>
        <CustomSelectSec
          options={dayOptions}
          value={dayOptions.find(
            (o) => o.value === selectedDate.getDate()
          )}
          onChange={(o) =>
            syncDate(
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                o.value
              )
            )
          }
        />

        <CustomSelectSec
          options={MONTH_OPTIONS}
          value={MONTH_OPTIONS.find(
            (o) => o.value === selectedDate.getMonth()
          )}
          onChange={(o) =>
            syncDate(
              new Date(
                currentDate.getFullYear(),
                o.value,
                selectedDate.getDate()
              )
            )
          }
        />

        <CustomSelectSec
          options={YEAR_OPTIONS}
          value={YEAR_OPTIONS.find(
            (o) => o.value === selectedDate.getFullYear()
          )}
          onChange={(o) =>
            syncDate(
              new Date(
                o.value,
                currentDate.getMonth(),
                selectedDate.getDate()
              )
            )
          }
        />
      </CalendarHead>

      <CalendarContent>
        <Header>
          <NavButton onClick={() => changeWeek(-1)}>
            <img src={arrow} alt="" />
          </NavButton>

          <DateDisplay>
            {startDate && endDate
              ? `${startDate.slice(8, 10)}–${endDate.slice(8, 10)}`
              : ""}
          </DateDisplay>

          <NavButton onClick={() => changeWeek(1)}>
            <img src={arrow} alt="" />
          </NavButton>
        </Header>

        <WeekGrid>
          {currentWeek.map((day, i) => {
            const selected =
              day.toDateString() ===
              selectedDate.toDateString();

            return (
              <DayColumn key={i}>
                <DayOfWeek>{DAYS_OF_WEEK[i]}</DayOfWeek>
                <DayCell
                  isSelected={selected}
                  hasEvent={hasEventsOnDay(day)}
                  onClick={() => syncDate(day)}
                >
                  <DayNumber isSelected={selected}>
                    {day.getDate()}
                  </DayNumber>
                </DayCell>
              </DayColumn>
            );
          })}
        </WeekGrid>

        <CalendarButton>
          <BtnBase
            onClick={handleAddPost}
            disabled={isPending}
          >
            {isPending ? "Создание..." : "Добавить пост"}
          </BtnBase>
        </CalendarButton>

        <CalendarText>
          {events.filter(
            (e) =>
              new Date(e.scheduledAt).toDateString() ===
              selectedDate.toDateString()
          ).length
            ? "Запланированные посты:"
            : "На этот день нету запланированных постов"}
        </CalendarText>
      </CalendarContent>
    </div>
  );
};

const CalendarHead = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 48px;
	padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
	@media(max-width: 480px) {
    gap: 16px;
  }
`;
const CalendarContent = styled.div`
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 64px;

  @media(max-width: 768px) {
    gap: 20px;
  }
  @media(max-width: 480px) {
    justify-content: space-between;
    margin-bottom: 48px;
  }
`;

const DateDisplay = styled.h1`
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  @media(max-width: 768px) {
    font-size: 32px;
  }
  @media(max-width: 480px) {
    font-size: 22px;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  border: 2px solid #6A7080;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #AC60FD;
  }

  &:nth-child(1) img {
    transform: rotate(180deg);
  }
`;

const WeekGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px 56px;
  @media(max-width: 480px) {
    gap: 40px;
  }
`;

const DayColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

const DayOfWeek = styled.div`
    font-size: 12px;
    font-weight: 700;
    color: #6A7080;
    text-transform: uppercase;
    margin-bottom: 24px;
`;

const DayCell = styled.div`
    position: relative;
    cursor: pointer;
    transition: all 0.2s;
    padding-bottom: 40px;

    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 30px;
        height: 2px;
        background-color: ${props => props.isSelected ? '#AC60FD' : 'transparent'};
    }
    @media(max-width: 480px) {
        padding-bottom: 0px;
        &::before {
            display: none;
        }
    }
    &:hover {
        border-bottom-color: ${props => props.isSelected ? '#AC60FD' : '#6A7080'};
    }
`;

const DayNumber = styled.div`
    color: ${props => props.isSelected ? '#AC60FD' : 'inherit'};
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 4px;
    transition: color 0.2s;
`;

const CalendarButton = styled.div`
    margin-top: 64px;
    @media(max-width: 480px) {
        margin-top: 40px;
    }
`;
const CalendarText = styled.p`
    font-weight: 700;
    font-size: 24px;
    margin-top: 64px;
    @media(max-width: 480px) {
        margin-top: 48px;
    }
`;

export default CalendarPopup;