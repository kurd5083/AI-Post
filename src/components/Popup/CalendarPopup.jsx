import styled from "styled-components";
import { useState, useEffect } from "react";
import { useCalendarEventsByRange } from "@/lib/calendar/useCalendarEventsByRange";
import { generateWeek } from "@/lib/generateWeek";
import CalendarHeader from "@/components/Popup/Сalendar/CalendarHeader";
import CalendarWeek from "@/components/Popup/Сalendar/CalendarWeek";
import CalendarFooter from "@/components/Popup/Сalendar/CalendarFooter";
import CalendarPostsList from "@/components/Popup/Сalendar/CalendarPostsList";
import ModernLoading from "@/components/ModernLoading";
import { usePopupStore } from "@/store/popupStore"

const CalendarPopup = () => {
  const { popup } = usePopupStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState([]);
  const channelId = popup?.data?.channelId;
  
  useEffect(() => {
    setCurrentWeek(generateWeek(currentDate));
  }, [currentDate]);

  const startDate = new Date(selectedDate);
  startDate.setUTCHours(0, 0, 0, 0);

  const endDate = new Date(selectedDate);
  endDate.setUTCHours(23, 59, 59, 999);

  const startISO = startDate.toISOString();
  const endISO = endDate.toISOString();

  const { events = [], eventsLoading } = useCalendarEventsByRange(startISO, endISO);
  const filteredEvents = events.filter( event => event.channelId === channelId);

  const syncDate = (date) => {
    setSelectedDate(date);
    if (date < currentWeek[0] || date > currentWeek[6]) {
      setCurrentDate(date);
    }
  };

  const changeWeek = (dir) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + dir * 7);
    setCurrentDate(d);
  };

  return (
    <CalendarContent>
      <CalendarHeader
        selectedDate={selectedDate}
        syncDate={syncDate}
      />
      <CalendarWeek
        currentWeek={currentWeek}
        selectedDate={selectedDate}
        startDate={currentWeek[0]}
        endDate={currentWeek[6]}
        changeWeek={changeWeek}
        syncDate={syncDate}
      />
      <CalendarFooter
        events={filteredEvents}
        channelId={channelId}
        selectedDate={selectedDate}
      />
      {eventsLoading ? (
        <ModernLoading text="Загрузка постов..." />
      ) : (
        <CalendarPostsList posts={filteredEvents} />
      )}
    </CalendarContent>
  );
};

const CalendarContent = styled.div`
  padding: 0 56px 30px;

  @media (max-width: 1600px) {
    padding: 0 32px 30px;
  }
  @media (max-width: 768px) {
    padding: 0 24px 30px;
  }
`;

export default CalendarPopup;