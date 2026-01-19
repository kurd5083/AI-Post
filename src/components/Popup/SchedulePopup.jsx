import { useEffect, useState } from "react";
import styled from "styled-components";

import PlusIcon from "@/icons/PlusIcon";

import CustomSelect from "@/shared/CustomSelect";
import Checkbox from "@/shared/Checkbox";
import TimeInput from "@/shared/TimeInput";
import BtnBase from "@/shared/BtnBase";
import BlocksItems from "@/shared/BlocksItems";

import { useCreateChannelSchedule } from "@/lib/channels/schedule/useCreateChannelSchedule";
import { useChannelSchedule } from "@/lib/channels/schedule/useChannelSchedule";
import { useUpdateChannelSchedule } from "@/lib/channels/schedule/useUpdateChannelSchedule";
import { useNotificationStore } from "@/store/notificationStore";

const SchedulePopup = ({ channelId, DAYS }) => {
  const { addNotification } = useNotificationStore();

  const { channelSchedule } = useChannelSchedule(channelId);
  const scheduleId = channelSchedule?.id;
  const createSchedule = useCreateChannelSchedule(channelId);
  const updateSchedule = useUpdateChannelSchedule(scheduleId, channelId);

  const [timezone, setTimezone] = useState(null);
  const [publicationTimes, setPublicationTimes] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [currentTime, setCurrentTime] = useState({ hours: 0, minutes: 0 });

  useEffect(() => {
    if (channelSchedule) {
      setTimezone(channelSchedule.timezone);
      setPublicationTimes(channelSchedule.publicationTimes || []);
      setSelectedDays(channelSchedule.postDays || []);
    }
  }, [channelSchedule]);

  const handleAddTime = () => {
    const hours = Number(currentTime.hours);
    const minutes = Number(currentTime.minutes);

    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return addNotification("Введите корректное время", "info");
    }

    const timeStr = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    if (publicationTimes.includes(timeStr)) {
      return addNotification("Это время уже добавлено", "info");
    }

    setPublicationTimes([...publicationTimes, timeStr]);
  };

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSave = () => {
    if (!timezone) {
      return addNotification("Выберите часовой пояс", "info");
    }
    if (!selectedDays.length || !publicationTimes.length) {
      return addNotification("Выберите дни недели и время публикаций", "info");
    }

    const payload = {
      postDays: selectedDays,
      publicationTimes,
      timezone,
    };

    if (scheduleId) {
      updateSchedule.mutate(payload, {
        onSuccess: () => addNotification("Расписание обновлено", "update"),
        onError: (err) =>
          addNotification(err?.message || "Ошибка при обновлении расписания", "error"),
      });
    } else {
      createSchedule.mutate(payload, {
        onSuccess: () => addNotification("Расписание создано", "success"),
        onError: (err) =>
          addNotification(err?.message || "Ошибка при создании расписания", "error"),
      });
    }
  };

  return (
    <ScheduleContainer>
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
        <ScheduleKeyTitle>Выберите время публикаций</ScheduleKeyTitle>
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
        {publicationTimes.length === 0 ? (
          <EmptyText>Время публикаций не добавлены</EmptyText>
        ) : (
          <BlocksItems
            items={publicationTimes.map((t, index) => ({ value: t, id: index }))}
            color="#FFF980"
            onRemove={(id) => setPublicationTimes(publicationTimes.filter((_, i) => i !== id))}
          />
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

      <BtnBase
        $margin="64"
        onClick={handleSave}
        disabled={createSchedule.isPending || updateSchedule.isPending}
      >
        {createSchedule.isPending || updateSchedule.isPending ? "Сохраняем..." : "Сохранить"}
      </BtnBase>
    </ScheduleContainer>
  );
};

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ScheduleTitle = styled.h2`
  font-family: "Montserrat Alternates", sans-serif; 
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 32px;
`;
const ScheduleKey = styled.div`
  margin-top: 40px;
`;
const ScheduleKeyTitle = styled.h2`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  color: #6a7080;
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
  background-color: #262a2d;
  border-radius: 50%;
`;
const EmptyText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #6A7080;
  margin-top: 32px;
`;
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

export default SchedulePopup;