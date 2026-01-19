import { useEffect, useState } from "react";
import styled from "styled-components";

import TimeInput from "@/shared/TimeInput";
import Checkbox from "@/shared/Checkbox";
import BtnBase from "@/shared/BtnBase";

import PlusIcon from "@/icons/PlusIcon";

import { usePopupStore } from "@/store/popupStore";
import { useNotificationStore } from "@/store/notificationStore";

const ScheduleIntervalPopup = ({ channelInterval, updateInterval, intervalPending, DAYS }) => {
  const { goBack } = usePopupStore();
  const { addNotification } = useNotificationStore();

  const [intervalMinutes, setIntervalMinutes] = useState(0);
  const [finalMinutes, setFinalMinutes] = useState(0);
  const [activeStartHour, setActiveStartHour] = useState(0);
  const [activeEndHour, setActiveEndHour] = useState(0);
  const [avoidNight, setAvoidNight] = useState(false);
  const [showResultInterval, setShowResultInterval] = useState(false);
  const [showResultActiveTime, setShowResultActiveTime] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    if (channelInterval) {
      setIntervalMinutes(channelInterval.intervalMinutes);
      setFinalMinutes(channelInterval.intervalMinutes);
      setActiveStartHour(channelInterval.activeStartHour);
      setActiveEndHour(channelInterval.activeEndHour);
      setAvoidNight(channelInterval.avoidNight);
      setSelectedDays(channelInterval.intervalPostDays);
    }
  }, [channelInterval]);
  
  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSave = () => {
    if (finalMinutes <= 0)
      return addNotification("Выберите корректный интервал", "info");

    if (activeStartHour === null || activeEndHour === null)
      return addNotification("Установите активное время публикаций", "info");

     if (!selectedDays.length) {
      return addNotification("Выберите дни недели", "info");
    }
    updateInterval(
      {
        intervalMinutes: finalMinutes,
        avoidNight,
        activeStartHour,
        activeEndHour,
        intervalPostDays: selectedDays,
      },
      {
        onSuccess: () => {
          addNotification("Настройки сохранены", "success");
        },
        onError: (err) => {
          addNotification(err.message || "Ошибка при сохранении интервала", "error");
        },
      }
    );
  };


  const hours = Math.floor(finalMinutes / 60);
  const minutes = finalMinutes % 60;

  return (
    <ScheduleContainer>
      <ScheduleTitle>Интервал публикаций</ScheduleTitle>
      <ScheduleDesc>
        Установите периодичность, с которой система будет отправлять посты.<br />
        Интервал применяется поверх расписания и очереди.<br />
        Для равномерного охвата выбирайте разумные значения.
      </ScheduleDesc>

      <ScheduleKey>
        <ScheduleKeyTitle>Выберите интервал</ScheduleKeyTitle>
        <ScheduleInputContainer>
          <TimeInput
            hours={Math.floor(intervalMinutes / 60)}
            minutes={intervalMinutes % 60}
            onChange={(h, m) => setIntervalMinutes(h * 60 + m)}
          />
          <ScheduleBtn onClick={() => { setFinalMinutes(intervalMinutes); setShowResultInterval(true); }}>
            <PlusIcon color="#FFF980" />
          </ScheduleBtn>
        </ScheduleInputContainer>
        {showResultInterval && (
          <ScheduleResult>
            Будет публиковаться каждые{" "}
            <mark>
              {hours > 0 && `${hours} ч `}
              {minutes > 0 && `${minutes} мин`}
            </mark>
          </ScheduleResult>
        )}
      </ScheduleKey>

      <ScheduleKey>
        <ScheduleKeyTitle>Активное время публикаций</ScheduleKeyTitle>
        <ScheduleInputContainer>
          <TimeInput hours={activeStartHour} onChange={(h) => setActiveStartHour(h)} />
          <Dash />
          <TimeInput hours={activeEndHour} onChange={(h) => setActiveEndHour(h)} />
          <ScheduleBtn onClick={() => setShowResultActiveTime(true)}>
            <PlusIcon color="#FFF980" />
          </ScheduleBtn>
        </ScheduleInputContainer>
        {showResultActiveTime && (
          <ScheduleResult>
            Активное время: <mark>{activeStartHour}</mark> - <mark>{activeEndHour}</mark>
          </ScheduleResult>
        )}
      </ScheduleKey>

      <ScheduleKey>
        <ScheduleKeyTitle>Выберите дни недели</ScheduleKeyTitle>
        <ScheduleDays>
          {DAYS.map((day) => (
            <ScheduleDaysBlock key={day.value}>
              <Checkbox
                color="#FFF980"
                checked={selectedDays.includes(day.value)}
                onChange={() => toggleDay(day.value)}
              >
                <h4>{day.label}</h4>
              </Checkbox>
            </ScheduleDaysBlock>
          ))}
        </ScheduleDays>
      </ScheduleKey>


      <ScheduleKey>
        <ScheduleKeyTitle>Дополнительно</ScheduleKeyTitle>
        <ScheduleKeyItem>
          <Checkbox checked={avoidNight} onChange={() => setAvoidNight(!avoidNight)}>
            <h4>Не публиковать в ночное время</h4>
          </Checkbox>
        </ScheduleKeyItem>
      </ScheduleKey>

      <ScheduleButtons>
        <BtnBase $color="#D6DCEC" $bg="#336CFF" onClick={handleSave} disabled={intervalPending}>
          {intervalPending ? "Сохраняем..." : "Сохранить"}
        </BtnBase>
        <BtnBase onClick={goBack} $color="#D6DCEC" $bg="#242A3A">Отменить</BtnBase>
      </ScheduleButtons>
    </ScheduleContainer>
  );
};

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const ScheduleTitle = styled.h2`
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
`
const ScheduleDesc = styled.p`
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  color: #6A7080;
`
const ScheduleKey = styled.div`
  margin-top: 40px;
`
const ScheduleKeyTitle = styled.h2`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  color: #6A7080;
  margin-bottom: 26px;
`
const ScheduleInputContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`
const ScheduleResult = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  margin-top: 32px;

  mark {
    color: #FFF980;
  }
`
const Dash = styled.span`
  margin-top: -20px;
  width: 16px;
  height: 2px;
  background-color: #D6DCEC;
`
const ScheduleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background-color: #262A2D;
  border-radius: 50%;
  cursor: pointer;
`
const ScheduleKeyItem = styled.div`
  display: flex;
  padding: 24px 0;
  border-bottom: 2px solid #2E3954;
  font-family: "Montserrat Alternates", sans-serif;

  &:first-child {
    padding-top: 0;
  }
    
  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }

  h4 {
    font-size: 24px;
    font-weight: 700;
    display: flex;
    align-items: center;
  }
`
const ScheduleDays = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px 80px;

  h4 {
    font-size: 16px;
    font-weight: 700;
    width: 120px;
    display: flex;
    align-items: center;
  }
`;
const ScheduleDaysBlock = styled.div`
  font-family: "Montserrat Alternates", sans-serif;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const ScheduleButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 64px;
`

export default ScheduleIntervalPopup