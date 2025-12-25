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

export default CalendarPopup;
