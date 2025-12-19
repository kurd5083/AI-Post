import { useState, useEffect } from "react";
import styled from "styled-components";
import CustomSelect from "@/shared/CustomSelect";
import Checkbox from "@/shared/Checkbox";
import TimeInput from "@/shared/TimeInput";
import { usePopupStore } from "@/store/popupStore";
import BtnBase from "@/shared/BtnBase";
import BlocksItems from "@/shared/BlocksItems";
import PlusIcon from "@/icons/PlusIcon";
import { useCreateChannelSchedule } from "@/lib/channels/useCreateChannelSchedule";
import { useChannelSchedule } from "@/lib/channels/useChannelSchedule";

const DAYS = [
  { label: "Понедельник", value: "MONDAY" },
  { label: "Вторник", value: "TUESDAY" },
  { label: "Среда", value: "WEDNESDAY" },
  { label: "Четверг", value: "THURSDAY" },
  { label: "Пятница", value: "FRIDAY" },
  { label: "Суббота", value: "SATURDAY" },
  { label: "Воскресенье", value: "SUNDAY" },
];

const SchedulePopup = () => {
  const { popup, changeContent } = usePopupStore();
  const channelId = popup?.data?.channelId;

  const { channelSchedule } = useChannelSchedule(channelId);

  const [timezone, setTimezone] = useState(null);
  const [publicationTimes, setPublicationTimes] = useState([]);
  const [currentTime, setCurrentTime] = useState({ hours: 0, minutes: 0 });
  const [selectedDays, setSelectedDays] = useState([]);
  
  const createSchedule = useCreateChannelSchedule(channelId);
  console.log(channelSchedule)

  useEffect(() => {
    if (channelSchedule) {
      setTimezone(channelSchedule.timezone);
      setPublicationTimes(channelSchedule.publicationTimes);
      setSelectedDays(channelSchedule.postDays);
    }
  }, [channelSchedule]);

  const handleAddTime = () => {
    const timeStr = `${String(currentTime.hours).padStart(2,'0')}:${String(currentTime.minutes).padStart(2,'0')}`;
    if (!publicationTimes.includes(timeStr)) {
      setPublicationTimes([...publicationTimes, timeStr]);
    }
  };

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSave = () => {
    console.log(selectedDays, publicationTimes, timezone)

    if (selectedDays.length === 0 || publicationTimes.length === 0) return;
    createSchedule.mutate({
      postDays: selectedDays,
      publicationTimes,
      timezone,
    });
  };

  return (
    <ScheduleContainer>
      <ScheduleHead>
        <ScheduleHeadText $active={true}>Расписание</ScheduleHeadText>
        <ScheduleHeadText onClick={() => changeContent("schedule_interval")}>Интервал</ScheduleHeadText>
      </ScheduleHead>
      <ScheduleContent>
        <ScheduleTitle>Часовой пояс</ScheduleTitle>
        <CustomSelect
          options={[
            { value: "UTC", label: "UTC" },
            { value: "Europe/Moscow", label: "Европа/Москва" },
          ]}
          value={timezone}
          onChange={(option) => setTimezone(option.value)}
        />
        <ScheduleKey>
          <ScheduleKeyTitle>Выберите интервал</ScheduleKeyTitle>
          <ScheduleInputContainer>
            <TimeInput
              hours={currentTime.hours}
              minutes={currentTime.minutes}
              onChange={(h, m) => setCurrentTime({ hours: h, minutes: m })}
            />
            <ScheduleBtn onClick={handleAddTime}>
              <PlusIcon color="#FFF980" />
            </ScheduleBtn>
          </ScheduleInputContainer>
          <BlocksItems items={publicationTimes.map(t => ({ value: t }))} color="#FFF980" />
        </ScheduleKey>
        <ScheduleKey>
          <ScheduleKeyTitle>ДНИ НЕДЕЛИ</ScheduleKeyTitle>
          <ScheduleDays>
            {DAYS.map(day => (
              <ScheduleDaysBlock>
                <Checkbox
                  key={day.value}
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
        <BtnBase $margin="64" onClick={handleSave} disabled={createSchedule.isLoading}>
          {createSchedule.isLoading ? "Сохраняем..." : "Сохранить"}
        </BtnBase>
      </ScheduleContent>
    </ScheduleContainer>
  );
};

const ScheduleContainer = styled.div`
  padding: 0 56px;
  @media(max-width: 1600px) { padding: 0 32px; }
  @media(max-width: 768px) { padding: 0 24px; }
`;
const ScheduleHead = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 48px;
  @media(max-width: 480px) { margin-bottom: 40px; }
`;
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
  @media(max-width: 480px) { padding-right: 0; }
`;
const ScheduleContent = styled.div` display: flex; flex-direction: column; `;
const ScheduleTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 32px;
`;
const ScheduleKey = styled.div` margin-top: 40px; `;
const ScheduleKeyTitle = styled.h2`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  color: #6A7080;
  margin-bottom: 26px;
`;
const ScheduleInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;
const ScheduleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background-color: #262A2D;
  border-radius: 50%;
`;
const ScheduleDays = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px 80px;
  h4 { 
    font-size: 16px; 
    font-weight: 700; 
    display: flex; 
    align-items: center; 
    width: 120px;
  }
`;
const ScheduleDaysBlock = styled.div`
  display: flex; 
  flex-direction: column; 
  gap: 24px; 
`

export default SchedulePopup;