import { useState } from "react";
import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore";
import CloseIcon from "@/icons/CloseIcon";
import { useCreateCalendarEvent } from "@/lib/calendar/useCreateCalendarEvent";

const CreateCalendarEventPopup = () => {
  const { closePopup, popup } = usePopupStore();
  const { channelId } = popup?.data || {};

  const { mutate: createEvent, isPending } = useCreateCalendarEvent();

  const [title, setTitle] = useState("Scheduled Post");
  const [description, setDescription] = useState("Post description");
  const [scheduledAt, setScheduledAt] = useState(new Date().toISOString());
  const [duration, setDuration] = useState(60);
  const [priority, setPriority] = useState(0);

  const handleCreate = () => {
    if (!channelId) return alert("Не указан канал");

    createEvent(
      {
        channelId,
        eventType: "POST_SCHEDULED",
        title,
        description,
        scheduledAt,
        timezone: "UTC",
        duration,
        priority,
        postId: 1,
        scheduleId: 1,
        intervalId: 1,
        metadata: { source: "manual" },
      },
      {
        onSuccess: () => closePopup(),
      }
    );
  };

  return (
    <div>
      <PopupHead>
        <HeadTitle>Создать событие</HeadTitle>
        <CloseButton onClick={closePopup}>
          <CloseIcon color="#336CFF" />
        </CloseButton>
      </PopupHead>

      <InputLabel>Название</InputLabel>
      <PopupInput value={title} onChange={(e) => setTitle(e.target.value)} />

      <InputLabel>Описание</InputLabel>
      <PopupInput value={description} onChange={(e) => setDescription(e.target.value)} />

      <InputLabel>Дата и время</InputLabel>
      <PopupInput
        type="datetime-local"
        value={scheduledAt.slice(0, 16)}
        onChange={(e) => setScheduledAt(new Date(e.target.value).toISOString())}
      />

      <InputLabel>Длительность (минуты)</InputLabel>
      <PopupInput
        type="number"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
      />

      <InputLabel>Приоритет</InputLabel>
      <PopupInput
        type="number"
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
      />

      <PopupButtons>
        <BtnBase $color="#D6DCEC" $bg="#336CFF" onClick={handleCreate} disabled={isPending}>
          {isPending ? "Создание..." : "Создать"}
        </BtnBase>
        <BtnBase onClick={closePopup} $color="#D6DCEC" $bg="#242A3A">
          Отменить
        </BtnBase>
      </PopupButtons>
    </div>
  );
};

const PopupHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeadTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputLabel = styled.h3`
  margin-top: 24px;
  font-size: 14px;
  color: #6a7080;
  font-weight: 700;
`;

const PopupInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  margin-top: 8px;
  font-size: 16px;
  color: #d6dcec;
  background-color: transparent;
  border: 2px solid #2e3954;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #336cff;
  }
`;

const PopupButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 32px;

  button {
    width: 100%;
  }
`;

export default CreateCalendarEventPopup;
