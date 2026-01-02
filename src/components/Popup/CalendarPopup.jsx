import styled from "styled-components";
import { useState, useEffect, useMemo  } from "react";
import { usePopupStore } from "@/store/popupStore";
import { useCalendarEventsByRange } from "@/lib/calendar/useCalendarEventsByRange";
import { generateWeek } from "@/lib/generateWeek";
import CalendarHeader from "@/components/Popup/Сalendar/CalendarHeader";
import CalendarWeek from "@/components/Popup/Сalendar/CalendarWeek";
import CalendarFooter from "@/components/Popup/Сalendar/CalendarFooter";
import CalendarPostsList from "@/components/Popup/Сalendar/CalendarPostsList";

const safeDate = (value) => {
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

const dayKeyUTC = (d) =>
  `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`;


const CalendarPopup = () => {
  const { popup } = usePopupStore();
  const channelId = popup?.data?.channelId;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState([]);

  useEffect(() => {
    setCurrentWeek(generateWeek(currentDate));
  }, [currentDate]);
  
  const normalize = (iso) => iso.replace(/\.\d{3}Z$/, 'Z');

  const startDate = currentWeek[0]
    ? normalize(
      new Date(Date.UTC(
        currentWeek[0].getFullYear(),
        currentWeek[0].getMonth(),
        currentWeek[0].getDate(),
        0, 0, 0
      )).toISOString()
    )
    : new Date().toISOString();

  const endDate = currentWeek[6]
    ? normalize(
      new Date(Date.UTC(
        currentWeek[6].getFullYear(),
        currentWeek[6].getMonth(),
        currentWeek[6].getDate(),
        23, 59, 59
      )).toISOString()
    )
    : new Date().toISOString();
    console.log(startDate, endDate)
  const { events = [] } = useCalendarEventsByRange(startDate, endDate);
  console.log(events, "events")
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

  const postsForDay = useMemo(() => {

    const selectedKey = dayKeyUTC(selectedDate);
    return events.filter((e) => {
      const d = safeDate(e.scheduledAt);
      if (!d) return false;
      return dayKeyUTC(d) === selectedKey && e.channelId === channelId;
    });
  }, [events, selectedDate]);
  
  console.log(postsForDay, 'postsForDay')
      console.log("selectedDate:", selectedDate);
console.log("selectedKey:", dayKeyUTC(selectedDate));
events.forEach(e => {
  console.log("event", e.id, dayKeyUTC(new Date(e.scheduledAt)), e.channelId);
})
  return (
    <CalendarContent>
      <CalendarHeader
        currentDate={currentDate}
        selectedDate={selectedDate}
        syncDate={syncDate}
      />
      <CalendarWeek
        currentWeek={currentWeek}
        selectedDate={selectedDate}
        startDate={startDate}
        endDate={endDate}
        changeWeek={changeWeek}
        syncDate={syncDate}
      />
      <CalendarFooter
        events={events}
        selectedDate={selectedDate}
      />
      <CalendarPostsList posts={postsForDay} />
    </CalendarContent>
  );
};

const CalendarContent = styled.div`
  padding: 0 56px;

  @media (max-width: 1600px) {
    padding: 0 32px;
  }
  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;

export default CalendarPopup;