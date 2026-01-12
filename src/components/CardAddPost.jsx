import { useState, useEffect } from "react";
import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import { useLightboxStore } from "@/store/lightboxStore";
import { usePopupStore } from "@/store/popupStore";
import normalizeUrl from "@/lib/normalizeUrl";
import AvaPlug from "@/shared/AvaPlug";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);
import { useCreateCalendarEvent } from "@/lib/calendar/useCreateCalendarEvent";
import { useNotificationStore } from "@/store/notificationStore";

const MAX_VISIBLE_IMAGES = 3;

const CardAddPost = ({ item, bg, selectedChannel }) => {
  const { addNotification } = useNotificationStore();
  const { popup, goBack } = usePopupStore();
  const { openLightbox } = useLightboxStore();

  const [scheduledAt, setScheduledAt] = useState('');

  const channelId = popup?.data?.channelId;
  const selectedDate = popup?.data?.selectedDate;

  const { mutate: createEvent, isPending: creatingPending } = useCreateCalendarEvent();

  useEffect(() => {
    setScheduledAt(new Date(selectedDate).toISOString());
  }, [selectedDate]);

  const handleSave = (postId) => {
    if (!scheduledAt) {
      addNotification("Выберите дату и время", "info");
      return;
    }
    const scheduledAtValue = scheduledAt;
      createEvent(
        { channelId, description: '', scheduledAt: scheduledAtValue, postId },
        {
          onSuccess: () => {
            addNotification("Событие успешно создано", "success");
            goBack();
          },
          onError: (err) => addNotification(err.message || "Ошибка при создании события", "error"),
        }
      );
  };

  return (
    <CardAddItem $bg={bg}>
      <CardAddItemHead>
        <CardAddItemName>
          {selectedChannel.avatarUrl ? (
            <CardAddItemImg src={selectedChannel.avatarUrl} alt={selectedChannel.name} />
          ) : (
            <AvaPlug width="32px" height="32px" />
          )}
          <p>{selectedChannel.name}</p>
        </CardAddItemName>
        <CardAddItemTime>
          <p>{new Date(item.createdAt).toLocaleDateString("ru-RU")}</p>
          <span>
            {new Date(item.createdAt).toLocaleTimeString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </CardAddItemTime>
      </CardAddItemHead>
      <CardAddImages>
        {item.images.slice(0, MAX_VISIBLE_IMAGES).map((elem, index) => {
          const isLastVisible = index === MAX_VISIBLE_IMAGES - 1;
          const extraCount = item.images.length - MAX_VISIBLE_IMAGES;

          const src = elem instanceof File || elem instanceof Blob ? URL.createObjectURL(elem) : normalizeUrl(elem);

          return (
            <ImageItemWrapper
              key={index}
              onClick={() =>
                openLightbox({
                  images: item.images.map(i => i instanceof File || i instanceof Blob ? URL.createObjectURL(i) : normalizeUrl(i)),
                  initialIndex: index
                })
              }
            >
              <ImageItem
                src={src}
                alt={`картинка ${index}`}
              />
              {isLastVisible && extraCount > 0 && (
                <Overlay>
                  +{extraCount}
                </Overlay>
              )}
            </ImageItemWrapper>
          );
        })}
      </CardAddImages>
      <CardAddText>{item.title}</CardAddText>
      <CardAddSubtext
        dangerouslySetInnerHTML={{ __html: item.summary }}
      />
      <StyledDatePicker
  selected={scheduledAt ? new Date(scheduledAt) : null}
  onChange={(date) => {
    const now = new Date();
    if (date < now) {
      addNotification("Нельзя выбрать дату и время в прошлом", "error");
      return;
    }
    setScheduledAt(date.toISOString());
  }}
  locale="ru"
  showTimeSelect
  timeIntervals={5}
  dateFormat="yyyy-MM-dd HH:mm"
  wrapperClassName="picker-wrapper"
  calendarClassName="dark-calendar"
  className="picker-input"
  minDate={new Date()}
/>
      <CardAddButtons>
        <BtnBase
          $padding="16px 24px"
          $width="100%"
          $bg="transporent"
          $color="#D6DCEC"
          $border={true}
          onClick={() => handleSave(item.id)}
          disabled={creatingPending}
        >
          {creatingPending ? "Сохранение..." : "Выбрать пост"}
        </BtnBase>
      </CardAddButtons>
    </CardAddItem>
  )
}

const CardAddOpen = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  border: 2px solid #1C2438;
`

const CardAddItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative; 
  box-sizing: border-box;
  padding: 20px;
  border: 2px solid ${({ $bg }) => $bg ? '#181F30' : '#1F273B'};
  border-radius: 24px;
  background-color: ${({ $bg }) => $bg ? '#181F30' : 'transporent'};

  &:hover {
    background-color: #181F30;
    border: 2px solid #181F30;
    ${CardAddOpen} {
      background-color: #1C2438;
      
			svg path {
        stroke: #D6DCEC; 
      }
    }
  }
`
const CardAddItemHead = styled.div`
  display: flex;
  justify-content: space-between;
`
const CardAddItemName = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
    
  p {
    max-width: 100px;         
    white-space: nowrap;  
    overflow: hidden;     
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 700;
  }
`
const CardAddItemImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`
const CardAddItemTime = styled.p`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 14px;
  font-weight: 700;
  span {
    color:#6A7080;
  }
`
const CardAddImages = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  flex-grow: 1;
`
const ImageItemWrapper = styled.div`
  position: relative;
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
`;
const ImageItem = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  color: #fff;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CardAddText = styled.p`
  box-sizing: border-box;
  margin-top: 18px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
const CardAddSubtext = styled.p`
  box-sizing: border-box;
  margin-top: 16px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  color: #6A7080;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
const StyledDatePicker = styled(DatePicker)`
  background-color: transparent;
  width: 100%;
  color: #d6dcec;
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 24px;
  border: none;
  border-bottom: 2px solid #2e3954;
  margin-top: 20px;

  &:focus {
    outline: none;
  }
`;
const CardAddButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
`

export default CardAddPost