import styled from "styled-components";
import { useState, useEffect } from "react";
import CustomSelectSec from "@/shared/CustomSelectSec";
import arrow from "@/assets/arrow.svg";
import BtnSave from "@/shared/BtnSave";

const CalendarPopup = () => {
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

    return (
        <div>
            <CalendarHead>
                <CustomSelectSec
                    placeholder="День"
                    options={dayOptions}
                    value={dayOptions.find(o => o.value === selectedDate.getDate())}
                    onChange={(option) => handleDayChange(option.value)}
                />

                <CustomSelectSec
                    placeholder="Месяц"
                    options={monthOptions}
                    value={monthOptions.find(o => o.value === selectedDate.getMonth())}
                    onChange={(option) => handleMonthChange(option.value)}
                />

                <CustomSelectSec
                    placeholder="Год"
                    options={yearOptions}
                    value={yearOptions.find(o => o.value === selectedDate.getFullYear())}
                    onChange={(option) => handleYearChange(option.value)}
                />
            </CalendarHead>
            <CalendarContainer>
                <Header>
                    <NavButton onClick={prevWeek}><img src={arrow} alt="arrow icon" /></NavButton>
                    <DateDisplay>{formatWeekRange()}</DateDisplay>
                    <NavButton onClick={nextWeek}><img src={arrow} alt="arrow icon" /></NavButton>
                </Header>
                <WeekGrid>
                    {daysOfWeek.map((day, i) => (
                        <DayOfWeek key={i}>{day}</DayOfWeek>
                    ))}
                </WeekGrid>
                <WeekGrid>
                    {currentWeek.map((day, index) => {
                        const isSelected = day.toDateString() === selectedDate.toDateString();

                        return (
                            <DayCell
                                key={index}
                                isSelected={isSelected}
                                onClick={() => handleDateClick(day)}
                            >
                                <DayNumber isSelected={isSelected}>
                                    {day.getDate()}
                                </DayNumber>
                            </DayCell>
                        );
                    })}
                </WeekGrid>
                <BtnSave $color="#AC60FD" $bg="#1F203D" $margin="64">Добавить пост</BtnSave>
                <CalendarText>На этот день нету запланированных постов</CalendarText>
            </CalendarContainer>
        </div>
    );
};

const CalendarHead = styled.div`
    display: flex;
    gap: 40px;
    margin-bottom: 48px;
`;

const CalendarContainer = styled.div``;

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 40px;
    margin-bottom: 64px;
`;

const DateDisplay = styled.h1`
    font-size: 48px;
    font-weight: 700;
    min-width: 300px;
    text-align: center;
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
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
    justify-items: start;
`;

const DayOfWeek = styled.div`
    font-size: 12px;
    font-weight: 700;
    color: #6A7080;
    text-transform: uppercase;
    text-align: center;
`;

const DayCell = styled.div`
    margin-top: 24px;
    border-bottom: 2px solid ${props => props.isSelected ? '#AC60FD' : 'transparent'};
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;
    padding-bottom: 40px;
    
    &:hover {
        border-bottom-color: ${props => props.isSelected ? '#AC60FD' : '#6A7080'};
    }
`;

const DayNumber = styled.div`
    color: ${props => props.isSelected && '#AC60FD'};
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 4px;
    transition: color 0.2s;
`;

const CalendarText = styled.p`
    font-weight: 700;
    font-size: 24px;
    margin-top: 64px;
`
export default CalendarPopup;