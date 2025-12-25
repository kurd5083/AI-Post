import styled from "styled-components";
import { useState, useEffect } from "react";
import CustomSelectSec from "@/shared/CustomSelectSec";
import arrow from "@/assets/arrow.svg";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore";
import { useCreateCalendarEvent } from "@/lib/calendar/useCreateCalendarEvent";

const CalendarPopup = () => {
    const { popup } = usePopupStore()
    const channelId = popup?.data?.channelId;
    const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 22));
    const [selectedDate, setSelectedDate] = useState(new Date(2026, 8, 22));
    const [currentWeek, setCurrentWeek] = useState([]);

    const daysOfWeek = [
        'ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА',
        'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА', 'ВОСКРЕСЕНЬЕ'
    ];

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getDayOptions = (year, month) => {
        return Array.from(
            { length: getDaysInMonth(year, month) },
            (_, i) => ({ value: i + 1, label: String(i + 1) })
        );
    };

    const monthOptions = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ].map((m, i) => ({ value: i, label: m }));

    const yearOptions = [
        { value: 2024, label: "2024" },
        { value: 2025, label: "2025" },
        { value: 2026, label: "2026" },
        { value: 2027, label: "2027" }
    ];

    const generateWeek = (date) => {
        const week = [];
        const dayOfWeek = date.getDay();
        const monday = new Date(date);

        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        monday.setDate(date.getDate() + diff);

        for (let i = 0; i < 7; i++) {
            const day = new Date(monday);
            day.setDate(monday.getDate() + i);
            week.push(day);
        }

        return week;
    };

    useEffect(() => {
        setCurrentWeek(generateWeek(currentDate));
    }, [currentDate]);

    const prevWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(newDate);
    };

    const nextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);
        setCurrentDate(newDate);
    };

    const formatWeekRange = () => {
        if (currentWeek.length === 0) return "";
        const first = currentWeek[0];
        const last = currentWeek[6];

        const firstDay = first.getDate().toString().padStart(2, "0");
        const firstMonth = (first.getMonth() + 1).toString().padStart(2, "0");
        const lastDay = last.getDate().toString().padStart(2, "0");
        const lastMonth = (last.getMonth() + 1).toString().padStart(2, "0");
        const year = first.getFullYear();

        if (first.getMonth() === last.getMonth()) {
            return `${firstDay}-${lastDay}.${firstMonth}.${year}`;
        } else {
            return `${firstDay}.${firstMonth} - ${lastDay}.${lastMonth}.${year}`;
        }
    };

    const handleDayChange = (value) => {
        const newDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            value
        );
        setSelectedDate(newDate);

        const weekStart = new Date(currentWeek[0]);
        const weekEnd = new Date(currentWeek[6]);
        weekEnd.setHours(23, 59, 59, 999);

        if (newDate < weekStart || newDate > weekEnd) {
            setCurrentDate(newDate);
        }
    };

    const handleMonthChange = (value) => {
        const newDate = new Date(
            currentDate.getFullYear(),
            value,
            Math.min(selectedDate.getDate(), getDaysInMonth(currentDate.getFullYear(), value))
        );
        setSelectedDate(newDate);
        setCurrentDate(newDate);
    };

    const handleYearChange = (value) => {
        const newDate = new Date(
            value,
            currentDate.getMonth(),
            Math.min(selectedDate.getDate(), getDaysInMonth(value, currentDate.getMonth()))
        );
        setSelectedDate(newDate);
        setCurrentDate(newDate);
    };


    const handleDateClick = (date) => {
        setSelectedDate(date);
        const weekStart = new Date(currentWeek[0]);
        const weekEnd = new Date(currentWeek[6]);
        weekEnd.setHours(23, 59, 59, 999);

        if (date < weekStart || date > weekEnd) {
            setCurrentDate(date);
        }
    };
    const dayOptions = getDayOptions(currentDate.getFullYear(), currentDate.getMonth());

    const { mutate: createEvent, isPending } = useCreateCalendarEvent();
    const handleAddPost = () => {
    createEvent({
        channelId: channelId, 
        eventType: "POST_SCHEDULED",
        title: "Scheduled Post",
        description: "Post description",
        scheduledAt: selectedDate.toISOString(),
        timezone: "UTC",
        duration: 60,
        priority: 0,
        metadata: {
            source: "calendar",
        },
    });
};

    return (
        <div>
            <CalendarHead>
                <CustomSelectSec
                    placeholder="День"
                    options={dayOptions}
                    value={dayOptions.find(o => o.value === selectedDate.getDate())}
                    onChange={(option) => handleDayChange(option.value)}
                    width="165px"
					fs="22px"
                />
                <CustomSelectSec
                    placeholder="Месяц"
                    options={monthOptions}
                    value={monthOptions.find(o => o.value === selectedDate.getMonth())}
                    onChange={(option) => handleMonthChange(option.value)}
                    width="180px"
					fs="22px"
                />
                <CustomSelectSec
                    placeholder="Год"
                    options={yearOptions}
                    value={yearOptions.find(o => o.value === selectedDate.getFullYear())}
                    onChange={(option) => handleYearChange(option.value)}
                    width="165px"
					fs="22px"
                />
            </CalendarHead>
            <CalendarContent>
                <Header>
                    <NavButton onClick={prevWeek}><img src={arrow} alt="arrow icon" /></NavButton>
                    <DateDisplay>{formatWeekRange()}</DateDisplay>
                    <NavButton onClick={nextWeek}><img src={arrow} alt="arrow icon" /></NavButton>
                </Header>
                
                <WeekGrid>
                    {currentWeek.map((day, index) => {
                        const isSelected = day.toDateString() === selectedDate.toDateString();
                        const dayOfWeekName = daysOfWeek[index];

                        return (
                            <DayColumn key={index}>
                                <DayOfWeek>{dayOfWeekName}</DayOfWeek>
                                <DayCell
                                    isSelected={isSelected}
                                    onClick={() => handleDateClick(day)}
                                >
                                    <DayNumber isSelected={isSelected}>
                                        {day.getDate()}
                                    </DayNumber>
                                </DayCell>
                            </DayColumn>
                        );
                    })}
                </WeekGrid>
                <CalendarButton>
                    <BtnBase
                        $color="#AC60FD"
                        $bg="#1F203D"
                        onClick={handleAddPost}
                        disabled={isPending}
                    >
                        {isPending ? "Создание..." : "Добавить пост"}
                    </BtnBase>
                </CalendarButton>
                <CalendarText>На этот день нету запланированных постов</CalendarText>
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