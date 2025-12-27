import styled from "styled-components";
import { useState, useEffect } from "react";
import { usePopupStore } from "@/store/popupStore";
import { useCreateCalendarEvent } from "@/lib/calendar/useCreateCalendarEvent";
import { useCalendarEventsByRange } from "@/lib/calendar/useCalendarEventsByRange";
import { generateWeek } from "@/lib/generateWeek";
import CalendarHeader from "@/components/Popup/Сalendar/CalendarHeader";
import CalendarWeek from "@/components/Popup/Сalendar/CalendarWeek";
import CalendarFooter from "@/components/Popup/Сalendar/CalendarFooter";
import CalendarPostsList from "@/components/Popup/Сalendar/CalendarPostsList";

const CalendarPopup = () => {
  const { popup } = usePopupStore();
  const channelId = popup?.data?.channelId;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState([]);

  useEffect(() => {
    setCurrentWeek(generateWeek(currentDate));
  }, [currentDate]);

  const startDate = currentWeek[0]
  ? new Date(Date.UTC(
      currentWeek[0].getFullYear(),
      currentWeek[0].getMonth(),
      currentWeek[0].getDate(),
      0, 0, 0, 0
    )).toISOString()
  : null;

  const endDate = currentWeek[6]
  ? new Date(Date.UTC(
      currentWeek[6].getFullYear(),
      currentWeek[6].getMonth(),
      currentWeek[6].getDate(),
      23, 59, 59, 999
    )).toISOString()
  : null;
  const { events = [] } = useCalendarEventsByRange({
    channelId,
    startDate,
    endDate,
  });

  const { mutate, isPending } = useCreateCalendarEvent();

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
        isPending={isPending}
        onAdd={() =>
          mutate({
            channelId,
            eventType: "POST_SCHEDULED",
            scheduledAt: selectedDate.toISOString(),
            timezone: "UTC",
          })
        }
      />
			 <CalendarPostsList
				posts={events.filter(
					(e) =>
						new Date(e.scheduledAt).toDateString() ===
						selectedDate.toDateString()
				)}
			/>
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