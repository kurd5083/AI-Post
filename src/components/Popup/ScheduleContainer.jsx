import { useState, useEffect } from "react";
import styled from "styled-components";
import ToggleSwitch from "@/shared/ToggleSwitch";
import { usePopupStore } from "@/store/popupStore";
import SchedulePopup from "@/components/Popup/SchedulePopup";
import ScheduleIntervalPopup from "@/components/Popup/ScheduleIntervalPopup";

import { useChannelScheduleStatus } from "@/lib/channels/schedule/useChannelScheduleStatus";
import { useToggleChannelSchedule } from "@/lib/channels/schedule/useToggleChannelSchedule";
import { useChannelInterval } from "@/lib/channels/useChannelInterval";
import { useUpdateChannelInterval } from "@/lib/channels/useUpdateChannelInterval";
import { useNotificationStore } from "@/store/notificationStore";
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
  console.log(scheduleStatus, 'scheduleStatus')
  const { channelInterval } = useChannelInterval(channelId);

  const [localScheduleEnabled, setLocalScheduleEnabled] = useState(false);
  const [localIntervalEnabled, setLocalIntervalEnabled] = useState(false);

  useEffect(() => {
    if (scheduleStatus) setLocalScheduleEnabled(scheduleStatus.scheduleEnabled);
  }, [scheduleStatus]);

  useEffect(() => {
    if (channelInterval) setLocalIntervalEnabled(channelInterval.isEnabled);
  }, [channelInterval]);

  const { mutate: toggleScheduleApi, isPending: schedulePending } = useToggleChannelSchedule(channelId);
  const { mutate: updateInterval, isPending: intervalPending } = useUpdateChannelInterval(channelId);

  const toggleSchedule = () => {
    const nextSchedule = !localScheduleEnabled;
    const disableIntervalIfNeeded = localIntervalEnabled && nextSchedule;

    toggleScheduleApi(undefined, {
      onSuccess: () => {
        setLocalScheduleEnabled(nextSchedule);
        addNotification('Публикация по расписанию включена', "success");

        if (disableIntervalIfNeeded) {
          setLocalIntervalEnabled(false);
        }
      },
      onError: (err) => addNotification(err.message || "Ошибка переключения расписания", "error"),
    });

    if (disableIntervalIfNeeded) {
      updateInterval({ isEnabled: false }, {
        onError: (err) => addNotification(err.message || "Ошибка отключения интервала", "error"),
      });
    }
  };

  const toggleInterval = () => {
    const nextInterval = !localIntervalEnabled;
    const disableScheduleIfNeeded = localScheduleEnabled && nextInterval;

    updateInterval({ isEnabled: nextInterval }, {
      onSuccess: () => {
        setLocalIntervalEnabled(nextInterval);
        addNotification( "Интервальная публикация включена", "success" );

        if (disableScheduleIfNeeded) {
          setLocalScheduleEnabled(false);
        }
      },
      onError: (err) => addNotification(err.message || "Ошибка переключения интервала", "error"),
    });

    if (disableScheduleIfNeeded) {
      toggleScheduleApi(undefined, {
        onError: (err) => addNotification(err.message || "Ошибка отключения расписания", "error"),
      });
    }
  };


  return (
    <ScheduleContent>
      <ScheduleViews>
        <ToggleSwitch
          bg="#262A2D"
          checked={localScheduleEnabled}
          onChange={toggleSchedule}
          disabled={schedulePending || localIntervalEnabled}
        />
        <ScheduleTitle>
          Включить публикацию по<br /> расписанию для канала
        </ScheduleTitle>
      </ScheduleViews>

      <ScheduleViews>
        <ToggleSwitch
          bg="#262A2D"
          checked={localIntervalEnabled}
          onChange={toggleInterval}
          disabled={intervalPending || localScheduleEnabled}
        />
        <ScheduleTitle>
          Активировать интервальную<br /> публикацию
        </ScheduleTitle>
      </ScheduleViews>

      {localScheduleEnabled && <SchedulePopup channelId={channelId} DAYS={DAYS}/>}
      {localIntervalEnabled && (
        <ScheduleIntervalPopup
          channelInterval={channelInterval}
          updateInterval={updateInterval}
          intervalPending={intervalPending}
          DAYS={DAYS}
        />
      )}
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
  font-size: 24px; 
  font-weight: 700; 
`;

export default ScheduleContainer;
