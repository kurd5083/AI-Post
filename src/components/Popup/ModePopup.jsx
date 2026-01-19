
import { useEffect, useState } from "react";
import styled from "styled-components";

import Checkbox from "@/shared/Checkbox";
import CustomSelectSec from "@/shared/CustomSelectSec";

import { useUpdateWorkMode } from "@/lib/channels/mode/useUpdateWorkMode";
import { useUpdateChannelPremoderationMinutes } from "@/lib/channels/mode/useUpdateChannelPremoderationMinutes";

import { useNotificationStore } from "@/store/notificationStore";
import { usePopupStore } from "@/store/popupStore";


const ModePopup = () => {
  const { popup } = usePopupStore();
  const channelId = popup?.data?.channelId;
  const { addNotification } = useNotificationStore();

  const [selectedMode, setSelectedMode] = useState(null);
  const [premoderationMinutes, setPremoderationMinutes] = useState(30);
  const [requireApproval, setRequireApproval] = useState(false);
  const [pendingMode, setPendingMode] = useState(false);
  const [pendingMinutes, setPendingMinutes] = useState(false);

  const { mutate: setWorkMode } = useUpdateWorkMode(channelId);
  const { mutate: updatePremoderationMinutes } = useUpdateChannelPremoderationMinutes(channelId);

  useEffect(() => {
    if (!popup?.data) return;

    if (popup.data.workMode) setSelectedMode(popup.data.workMode);
    if (popup.data.canPublishWithoutApproval !== undefined) setRequireApproval(popup.data.canPublishWithoutApproval);
    if (popup.data.premoderationMinutes) setPremoderationMinutes(popup.data.premoderationMinutes);
  }, [popup?.data]);

  const handleSelectMode = (mode) => {
    setPendingMode(true);
    setWorkMode(
      { workMode: mode },
      {
        onSuccess: () => {
          setSelectedMode(mode);
          addNotification("Режим работы обновлён", "update");
        },
        onError: (err) => addNotification(err?.message || "Нет прав для изменения режима", "error"),
        onSettled: () => setPendingMode(false),
      }
    );
  };

  const handleChangeMinutes = (option) => {
    setPendingMinutes(true);
    updatePremoderationMinutes(
      { minutes: option.value },
      {
        onSuccess: () => {
          setPremoderationMinutes(option.value);
          addNotification(`Время премодерации обновлено: ${option.label}`, "update");
        },
        onError: (err) => addNotification(err?.message || "Нет прав для изменения времени", "error"),
        onSettled: () => setPendingMinutes(false),
      }
    );
  };

  return (
    <ModeContent>
      <ModeContentTitle>Выберите один режим работы</ModeContentTitle>
      <div>
        <ModeContentItem>
          <Checkbox
            checked={selectedMode === "AUTOPOSTING"}
            onChange={() => handleSelectMode("AUTOPOSTING")}
            disabled={pendingMode}
          >
            <div>
              <h4>Автопостинг</h4>
              <p>
                Сервис будет автоматически осуществлять публикации в ваш канал или группу
                в соответствии с заданными таймерами и днями недели
              </p>
            </div>
          </Checkbox>
        </ModeContentItem>

        <ModeContentItem>
          <Checkbox
            checked={selectedMode === "PREMODERATION"}
            onChange={() => handleSelectMode("PREMODERATION")}
            disabled={pendingMode}
          >
            <div>
              <h4>Премодерация</h4>
              <p>
                Наш бот будет отправлять вам посты на предварительную модерацию за указанное
                вами время, предоставляя возможность принять решение о публикации
              </p>
            </div>
          </Checkbox>
        </ModeContentItem>
      </div>

      {selectedMode === "PREMODERATION" && (
        <>
          <ModeContentTitle>Параметры премодерации</ModeContentTitle>

          <CustomSelectSec
            value={premoderationMinutes}
            onChange={handleChangeMinutes}
            options={[
              { label: "15 минут", value: 15 },
              { label: "30 минут", value: 30 },
              { label: "60 минут", value: 60 },
              { label: "2 часа", value: 120 },
            ]}
            width="215px"
            fs="24px"
            disabled={pendingMinutes}
          />
        </>
      )}
    </ModeContent>
  );
};

const ModeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 0 56px 30px;

  @media(max-width: 1600px) { padding: 0 32px 30px; }
  @media(max-width: 768px) { padding: 0 24px 30px; }
`;

const ModeContentTitle = styled.h3`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
  color: #6A7080;
`;

const ModeContentItem = styled.div`
  display: flex;
  padding: 24px 0;
  border-bottom: 2px solid #2E3954;

  &:first-child { padding-top: 0; }
  &:last-child { padding-bottom: 0; border-bottom: 0; }

  h4 {
    font-family: "Montserrat Alternates", sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  p {
    font-size: 14px;
    font-weight: 600;
    color: #6A7080;
  }
`;

export default ModePopup;
