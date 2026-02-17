import { useState } from "react";
import styled from "styled-components";

import CloseIcon from "@/icons/CloseIcon";

import BtnBase from "@/shared/BtnBase";
import { useAddChannelTrack } from "@/lib/analytics/useAddChannelTrack";

import { usePopupStore } from "@/store/popupStore";
import { useNotificationStore } from "@/store/notificationStore";

const ChangeUrlPopup = () => {
  const { closePopup } = usePopupStore();
  const { addNotification } = useNotificationStore();
  
  const [url, setUrl] = useState("");

  const { mutate: trackChannel, isPending } = useAddChannelTrack();

  const handleSave = () => {
    if (!url.trim()) {
      addNotification("Введите ссылку на канал", "info");
      return;
    }
    addNotification("После проведения аналитики канал появится в списке отслеживаемых", "info");
    trackChannel({ channel: url },
      {
        onSuccess: () => {
          addNotification("Канал добавлен в отслеживание", "success");
          closePopup();
        },
        onError: () => {
          addNotification("Не удалось подключить канал", "error");
        },
      }
    );
  };

  return (
    <>
      <ChangeUrlHead>
        <HeadTitle>Отслеживать канал</HeadTitle>
        <CloseButton onClick={() => closePopup()}>
          <CloseIcon color="#336CFF" />
        </CloseButton>
      </ChangeUrlHead>
      <ChangeUrlSubtitle>Вставьте ссылку на Telegram-канал для подключения аналитики и отслеживания статистики</ChangeUrlSubtitle>

      <ChangeUrlTitle>Ссылка на канал</ChangeUrlTitle>
      <ChangeUrlInput
        type="text"
        placeholder="https://t.me/channel_name"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <ChangeUrlButtons>
        <BtnBase
          $color="#D6DCEC"
          $bg="#336CFF"
          onClick={handleSave}
          disabled={isPending}
        >
          {isPending ? "Сохранение..." : "Сохранить"}
        </BtnBase>
        <BtnBase $color="#D6DCEC" $bg="#242A3A" onClick={() => closePopup()}>
          Отменить
        </BtnBase>
      </ChangeUrlButtons>
    </>
  );
};

const ChangeUrlHead = styled.div`
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
const ChangeUrlSubtitle = styled.p`
  color: #6a7080;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  margin-top: 24px;
`;
const ChangeUrlTitle = styled.h2`
  text-transform: uppercase;
  color: #6a7080;
  font-size: 12px;
  font-weight: 700;
  margin: 32px 0 26px;
  border: none;
`;
const ChangeUrlInput = styled.input`
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
const ChangeUrlButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 48px;

  button {
    width: 100%;
  }
`;

export default ChangeUrlPopup;