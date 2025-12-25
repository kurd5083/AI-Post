import { useEffect, useState } from "react";
import styled from "styled-components";
import TimeInput from "@/shared/TimeInput";
import Checkbox from "@/shared/Checkbox";
import BtnBase from "@/shared/BtnBase";
import PlusIcon from "@/icons/PlusIcon";
import { useChannelInterval } from "@/lib/channels/useChannelInterval";
import { usePopupStore } from "@/store/popupStore"
import { useUpdateChannelInterval } from "@/lib/channels/useUpdateChannelInterval";
import { useUpdateChannelSchedule } from "@/lib/channels/useUpdateChannelSchedule";

const SchedulePopup = () => {
  const { popup, changeContent, goBack } = usePopupStore()
  const channelId = popup?.data?.channelId;
  const { channelInterval } = useChannelInterval(channelId);
  const [showResultInterval, setShowResultInterval] = useState(false);
  const [showResultActiveTime, setShowResultActiveTime] = useState(false);
  const [intervalMinutes, setIntervalMinutes] = useState(null);
  const [finalMinutes, setFinalMinutes] = useState(null);
  const [activeStartHour, setActiveStartHour] = useState(null); 
  const [activeEndHour, setActiveEndHour] = useState(null); 
  const [isEnabled, setIsEnabled] = useState(false);
  const [avoidNight, setAvoidNight] = useState(false);

  const startHour = activeStartHour ?? 0;
  const endHour = activeEndHour ?? 0;

  const { mutate: saveInterval, isLoading } = useUpdateChannelInterval(channelId);

  useEffect(() => {
    if (channelInterval) {
      setActiveStartHour(channelInterval.activeStartHour);
      setActiveEndHour(channelInterval.activeEndHour);
      setFinalMinutes(channelInterval.intervalMinutes);
      setIntervalMinutes(channelInterval.intervalMinutes);
      setIsEnabled(channelInterval.isEnabled);
      setAvoidNight(channelInterval.avoidNight);
    }
  }, [channelInterval]);

  const handleSave = () => {
    saveInterval({
      intervalMinutes: finalMinutes,
      isEnabled,
      avoidNight,
      activeStartHour,
      activeEndHour,
    });
  };

  const handleSelectCheckbox = (name, value) => {
    if (name === "isEnabled") {
      setIsEnabled(value);
    } else if (name === "avoidNight") {
      setAvoidNight(value);
    }
  };

  const hours = Math.floor((finalMinutes ?? 0) / 60);
  const minutes = (finalMinutes ?? 0) % 60;

  const handleShowResultInterval = () => {
    setShowResultInterval(true);
    setFinalMinutes(intervalMinutes);
  };
  const handleShowResultActiveTime = () => {
    setShowResultActiveTime(true);
  };

  return (
    <ScheduleContainer>
      <ScheduleHead>
        <ScheduleHeadText onClick={() => changeContent("schedule")}>Расписание</ScheduleHeadText>
        <ScheduleHeadText $active={true}>Интервал</ScheduleHeadText>
      </ScheduleHead>
      <ScheduleContent>
        <ScheduleTitle>Интервал публикаций</ScheduleTitle>
        <ScheduleDesc>Установите периодичность, с которой система будет отправлять посты.<br />
          Интервал применяется поверх расписания и очереди.<br />
          Для равномерного охвата выбирайте разумные значения.
        </ScheduleDesc>
        <ScheduleKey>
          <ScheduleKeyTitle>Выберите интервал</ScheduleKeyTitle>
          <ScheduleInputContainer>
            <TimeInput
              hours={Math.floor(intervalMinutes / 60)}
              minutes={intervalMinutes % 60}
              onChange={(newHours, newMinutes) => {
                setIntervalMinutes(newHours * 60 + newMinutes);
              }}
            />
            <ScheduleBtn onClick={handleShowResultInterval}>
              <PlusIcon color="#FFF980" />
            </ScheduleBtn>
          </ScheduleInputContainer>
          {showResultInterval && finalMinutes !== null && (
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
            <div>
              <TimeInput 
                hours={startHour}
                onChange={(h) => setActiveStartHour(h)}
              />
            </div>
            <Dash/>
            <div>
              <TimeInput 
                hours={endHour}
                onChange={(h) => setActiveEndHour(h)}
              />
            </div>
            <ScheduleBtn onClick={handleShowResultActiveTime}>
              <PlusIcon color="#FFF980" />
            </ScheduleBtn>
          </ScheduleInputContainer>
          {showResultActiveTime && (
            <ScheduleResult>
              Активное время:{" "}
              <mark>{startHour}</mark> - {" "}
              <mark>{endHour}</mark>
            </ScheduleResult>
          )}
        </ScheduleKey>
        <ScheduleKey>
          <ScheduleKeyTitle>Дополнительно</ScheduleKeyTitle>
          <ScheduleKeyItem>
            <Checkbox checked={isEnabled} onChange={() => handleSelectCheckbox("isEnabled", !isEnabled)}>
              <h4>Активировать интервальную публ.</h4>
            </Checkbox>
          </ScheduleKeyItem>
          <ScheduleKeyItem>
            <Checkbox checked={avoidNight} onChange={() => handleSelectCheckbox("avoidNight", !avoidNight)}>
              <h4>Не публиковать в ночное время</h4>
            </Checkbox>
          </ScheduleKeyItem>
        </ScheduleKey>
        <ScheduleButtons>
          <BtnBase
            $color="#D6DCEC"
            $bg="#336CFF"
            onClick={() => handleSave()}
            disabled={isLoading}
          >
            {isLoading ? "Сохраняем..." : "Сохранить"}
          </BtnBase>
          <BtnBase onClick={goBack} $color="#D6DCEC" $bg="#242A3A">Отменить</BtnBase>
        </ScheduleButtons>
      </ScheduleContent>
    </ScheduleContainer>
  )
}
const ScheduleContainer = styled.div`
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`
const ScheduleHead = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 48px;

  @media(max-width: 480px) {
    margin-bottom: 40px;
  }
`
const ScheduleHeadText = styled.p`
  display: flex;
  gap: 32px;
  color: ${({ $active }) => $active ? '#D6DCEC' : '#6A7080'};
  padding-bottom: 32px;
  border-bottom: 2px solid ${({ $active }) => $active ? '#D6DCEC' : '#2E3954'};
  font-weight: 700;
  font-size: 24px;
  padding-right: 40px;
  cursor: pointer;

  @media(max-width: 480px) {
    padding-right: 0;
  }
`
const ScheduleContent = styled.div`
  display: flex;
  flex-direction: column;
`
const ScheduleTitle = styled.h2`
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
const ScheduleButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 64px;
`

export default SchedulePopup