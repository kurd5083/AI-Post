import styled from "styled-components";
import { useState, useEffect } from "react";
import { generateWeek } from "@/lib/generateWeek";

import CalendarHeader from "@/components/Popup/Сalendar/CalendarHeader";
import CalendarWeek from "@/components/Popup/Сalendar/CalendarWeek";
import CalendarFooter from "@/components/Popup/Сalendar/CalendarFooter";
import CalendarPostsList from "@/components/Popup/Сalendar/CalendarPostsList";
import ModernLoading from "@/components/ModernLoading";

import { usePopupStore } from "@/store/popupStore"
import { useCalendarPopupStore } from "@/store/calendarPopupStore";
import { useCalendarEventsByRange } from "@/lib/calendar/useCalendarEventsByRange";

const CalendarPopup = () => {
  const { popup } = usePopupStore();
  const channelId = popup?.data?.channelId;

  const { selectedDate, currentWeek } = useCalendarPopupStore();

  const startDate = new Date(selectedDate);
  startDate.setUTCHours(0, 0, 0, 0);

  const endDate = new Date(selectedDate);
  endDate.setUTCHours(23, 59, 59, 999);

  const { events = [], eventsPending } = useCalendarEventsByRange(
    startDate.toISOString(),
    endDate.toISOString()
  );

  const filteredEvents = events.filter((event) => event.channelId === channelId);

  return (
    <CalendarContent>
      <CalendarHeader />
      <CalendarWeek
        currentWeek={currentWeek}
        startDate={currentWeek[0]}
        endDate={currentWeek[6]}
      />
      <CalendarFooter events={filteredEvents} channelId={channelId} />
      {eventsPending ? (
        <ModernLoading text="Загрузка постов..." />
      ) : (
        <CalendarPostsList posts={filteredEvents} />
      )}
    </CalendarContent>
  );
};

const CalendarContent = styled.div`
  padding-bottom: 30px;
`;

export default CalendarPopup;