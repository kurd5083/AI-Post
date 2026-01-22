import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import ToggleSwitch from "@/shared/ToggleSwitch";

import SchedulePopup from "@/components/Popup/SchedulePopup";

import { useChannelScheduleStatus } from "@/lib/channels/schedule/useChannelScheduleStatus";
import { useToggleChannelSchedule } from "@/lib/channels/schedule/useToggleChannelSchedule";

import { useNotificationStore } from "@/store/notificationStore";

import { usePopupStore } from "@/store/popupStore";

const DAYS = [
  { label: "Понедельник", value: "MONDAY" },
  { label: "Вторник", value: "TUESDAY" },
  { label: "Среда", value: "WEDNESDAY" },
  { label: "Четверг", value: "THURSDAY" },
  { label: "Пятница", value: "FRIDAY" },
  { label: "Суббота", value: "SATURDAY" },
  { label: "Воскресенье", value: "SUNDAY" },
];

const ScheduleContainer = () => {
  const { popup } = usePopupStore();
  const channelId = popup?.data?.channelId;
  const { addNotification } = useNotificationStore();

  const { scheduleStatus } = useChannelScheduleStatus(channelId);

  const [localScheduleEnabled, setLocalScheduleEnabled] = useState(false);

  useEffect(() => {
    setLocalScheduleEnabled(scheduleStatus?.scheduleEnabled || false);
  }, [scheduleStatus]);

  const { mutate: toggleScheduleApi, isPending: schedulePending } = useToggleChannelSchedule(channelId);

  const toggleSchedule = useCallback(() => {
    const nextSchedule = !localScheduleEnabled;

    toggleScheduleApi(undefined, {
      onSuccess: () => {
        setLocalScheduleEnabled(nextSchedule);

        addNotification(
          nextSchedule
            ? "Публикация по расписанию включена"
            : "Публикация по расписанию выключена",
          nextSchedule ? "success" : "error"
        );
      },
      onError: (err) =>
        addNotification(err.message || "Ошибка переключения расписания", "error"),
    });
  }, [localScheduleEnabled, toggleScheduleApi, addNotification]);

  return (
    <ScheduleContent>
      <ScheduleViews>
        <ToggleSwitch
          bg="#262A2D"
          checked={localScheduleEnabled}
          onChange={toggleSchedule}
          disabled={schedulePending}
        />
        <ScheduleTitle>
          Включить публикацию по<br /> расписанию для канала
        </ScheduleTitle>
      </ScheduleViews>
      {localScheduleEnabled && <SchedulePopup channelId={channelId} DAYS={DAYS} />}
    </ScheduleContent>
  );
};

const ScheduleContent = styled.div`
  padding: 0 56px 30px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media(max-width: 1600px) { padding: 0 32px 30px; }
  @media(max-width: 768px) { padding: 0 24px 30px; }
`;

const ScheduleViews = styled.div`
  display: flex;
  gap: 32px;
  @media(max-width: 480px) { align-items: flex-start; }
`;

const ScheduleTitle = styled.h2`
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 24px; 
  font-weight: 700; 
`;

export default ScheduleContainer;