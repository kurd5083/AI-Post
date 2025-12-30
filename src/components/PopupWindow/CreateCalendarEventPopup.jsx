import { useState, useEffect } from "react";
import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore";
import CloseIcon from "@/icons/CloseIcon";
import { useCreateCalendarEvent } from "@/lib/calendar/useCreateCalendarEvent";
import CustomSelectSec from "@/shared/CustomSelectSec";
import { usePostsByChannel } from "@/lib/posts/usePostsByChannel";

const CreateCalendarEventPopup = () => {
  const { goBack, popup } = usePopupStore();
  const channelId = popup?.data?.channelId;

  const { mutate: createEvent, isPending } = useCreateCalendarEvent();
  const { posts, loadingPosts } = usePostsByChannel(channelId);

  const [title, setTitle] = useState("Scheduled Post");
  const [description, setDescription] = useState("Post description");
  const [selectedPostId, setSelectedPostId] = useState(null);
    const [duration, setDuration] = useState(60);
  const [priority, setPriority] = useState(0);
  // const [scheduledAt, setScheduledAt] = useState(
  //   defaultDate ? new Date(defaultDate).toISOString() : new Date().toISOString()
  // );


  // useEffect(() => {
  //   if (defaultDate) {
  //     setScheduledAt(new Date(defaultDate).toISOString());
  //   }
  // }, [defaultDate]);

  const handleCreate = () => {
    const data = {
      channelId,
      eventType: "POST_SCHEDULED",
      title,
      description,
      scheduledAt: '',
      timezone: "UTC",
      duration,
      priority,
      postId: selectedPostId,
      scheduleId: 1,
      intervalId: 1,
      metadata: { source: "manual" },
    };

    createEvent(data, {
      onSuccess: () => {
        goBack();
      },
    });
  };

  return (
    <div>
      <PopupHead>
        <HeadTitle>Создать событие</HeadTitle>
        <CloseButton onClick={goBack}>
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
        // value={scheduledAt.slice(0, 16)}
        // onChange={(e) => setScheduledAt(new Date(e.target.value).toISOString())}
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

      <InputLabel>Выбрать пост</InputLabel>
      <CustomSelectSec
				options={posts?.map((post) => ({
          value: post.id,
          label: post.title,
        }))}
        value={selectedPostId}
        onChange={(option) => setSelectedPostId(option.value)}
        width="100%"
      />

      <PopupButtons>
        <BtnBase $color="#D6DCEC" $bg="#336CFF" onClick={handleCreate} disabled={isPending}>
          {isPending ? "Создание..." : "Создать"}
        </BtnBase>
        <BtnBase onClick={goBack} $color="#D6DCEC" $bg="#242A3A">
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
