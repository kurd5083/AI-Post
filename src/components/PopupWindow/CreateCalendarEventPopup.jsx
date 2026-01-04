import { useState, useEffect } from "react";
import styled from "styled-components";
import CloseIcon from "@/icons/CloseIcon";
import CustomSelectSec from "@/shared/CustomSelectSec";
import BtnBase from "@/shared/BtnBase";
import { useCreateCalendarEvent } from "@/lib/calendar/useCreateCalendarEvent";
import { useUpdateCalendarEvent } from "@/lib/calendar/useUpdateCalendarEvent";
import { usePostsByChannel } from "@/lib/posts/usePostsByChannel";
import { usePopupStore } from "@/store/popupStore";

const CreateCalendarEventPopup = () => {
  const { goBack, popup } = usePopupStore();

  const channelId = popup?.data?.channelId;
  const selectedDate = popup?.data?.selectedDate;
  const event = popup?.data?.event; 

  const isEdit = Boolean(event);
  const { mutate: createEvent, isPending: creating } = useCreateCalendarEvent();
  const { mutate: updateEvent, isPending: updating } = useUpdateCalendarEvent();

  const { posts, loadingPosts } = usePostsByChannel(channelId);
  const [description, setDescription] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [scheduledAt, setScheduledAt] = useState('');

  useEffect(() => {
    if (isEdit) {
      setDescription(event.description || "");
      setSelectedPostId(event.postId || null);
      setScheduledAt(event.scheduledAt);
    } else if (selectedDate) {
      setScheduledAt(new Date(selectedDate).toISOString());
    }
  }, [event, selectedDate, isEdit]);

  const handleSave = () => {
    const payload = {
      title: "Updated Post Title",
      status: "COMPLETED",
      description,
      scheduledAt,
    };

    if (isEdit) {
      updateEvent(
        { id: event?.id, payload },
        { onSuccess: goBack }
      );
    } else {
      createEvent(
        { channelId, ...payload },
        { onSuccess: goBack }
      );
    }
  };

  const isPending = creating || updating;

  return (
    <div>
      <PopupHead>
        <HeadTitle>{isEdit ? "Редактировать событие" : "Создать событие"}</HeadTitle>
        <CloseButton onClick={() => goBack()}>
          <CloseIcon color="#336CFF" />
        </CloseButton>
      </PopupHead>

      <InputLabel>Описание</InputLabel>
      <PopupInput value={description} onChange={(e) => setDescription(e.target.value)} />

      <InputLabel>Дата и время</InputLabel>
      <PopupInput
        type="datetime-local"
        value={scheduledAt.slice(0, 16)}
        onChange={(e) => setScheduledAt(new Date(e.target.value).toISOString())}
      />

      <InputLabel>Выбрать пост</InputLabel>
      <CustomSelectSec
				options={posts?.map((post) => ({
          value: post.id,
          label: post.title,
        }))}
        value={selectedPostId}
        onChange={(option) => setSelectedPostId(option.value)}
        width="100%"
        fs="16px"
        padding="24px"
      />

      <PopupButtons>
        <BtnBase
          $color="#D6DCEC"
          $bg="#336CFF"
          onClick={handleSave}
          disabled={isPending}
        >
          {isPending
            ? "Сохранение..."
            : isEdit
            ? "Обновить"
            : "Создать"}
        </BtnBase>
        <BtnBase 
          onClick={() => goBack()} 
          $color="#D6DCEC" 
          $bg="#242A3A"
        >
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
const InputLabel = styled.h2`
  text-transform: uppercase;
  color: #6a7080;
  font-size: 12px;
  font-weight: 700;
  margin: 48px 0 26px;
  border: none;
`;
const PopupInput = styled.input`
  background-color: transparent;
  width: 100%;
  color: #d6dcec;
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 24px;
  border: none;
  border-bottom: 2px solid #2e3954;
  &::placeholder {
    color: #d6dcec;
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
