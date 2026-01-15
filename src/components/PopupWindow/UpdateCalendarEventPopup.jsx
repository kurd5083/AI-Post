import { useState, useEffect } from "react";
import styled from "styled-components";
import CloseIcon from "@/icons/CloseIcon";
import BtnBase from "@/shared/BtnBase";
import { useUpdateCalendarEvent } from "@/lib/calendar/useUpdateCalendarEvent";
import { usePopupStore } from "@/store/popupStore";
import { useNotificationStore } from "@/store/notificationStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);

const UpdateCalendarEventPopup = () => {
  const { goBack, popup, closePopup } = usePopupStore();
  const { addNotification } = useNotificationStore();

  const event = popup?.data?.event;
  const { mutate: updateEvent, isPending: updatingPending } = useUpdateCalendarEvent();

  const [scheduledAt, setScheduledAt] = useState('');

   const getDateFromUtc = (utcString) => {
    if (!utcString) return null;
    const d = new Date(utcString);
    return new Date(d.getTime() + d.getTimezoneOffset() * 60000);
  };

  const getUtcString = (date) => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
  };

  useEffect(() => {
    setScheduledAt(event.scheduledAt);
  }, [event]);

  const handleSave = () => {
    if (!scheduledAt) {
      addNotification("Выберите дату и время", "info");
      return;
    }
    updateEvent(
      {
        id: event?.id,
        payload: { description: '', scheduledAt },
      },
      {
        onSuccess: () => {
          addNotification("Событие успешно обновлено", "update");
          popup && popup?.previousPage.length > 0 ? goBack() : closePopup()
        },
        onError: () => addNotification("Ошибка при обновлении события", "error"),
      }
    );
  };

  return (
    <div>
      <PopupHead>
        <HeadTitle>Редактировать событие</HeadTitle>
        <CloseButton onClick={() => popup && popup?.previousPage.length > 0 ? goBack() : closePopup()}>
          <CloseIcon color="#336CFF" />
        </CloseButton>
      </PopupHead>
      <InputLabel>Дата и время</InputLabel>
      <StyledDatePicker
        selected={scheduledAt ? getDateFromUtc(scheduledAt) : null}
        onChange={(date) => setScheduledAt(getUtcString(date))}
        locale="ru"
        showTimeSelect
        timeIntervals={5}
        dateFormat="yyyy-MM-dd HH:mm"
        wrapperClassName="picker-wrapper"
        calendarClassName="dark-calendar"
        className="picker-input"
        minDate={new Date()}
      />
      <PopupButtons>
        <BtnBase
          $color="#D6DCEC"
          $bg="#336CFF"
          onClick={handleSave}
          disabled={updatingPending}
        >
          {updatingPending ? "Обновление..." : "Обновить"}
        </BtnBase>
        <BtnBase
          onClick={() => popup && popup?.previousPage.length > 0 ? goBack() : closePopup()}
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
const StyledDatePicker = styled(DatePicker)`
  background-color: transparent;
  width: 100%;
  color: #d6dcec;
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 24px;
  border: none;
  border-bottom: 2px solid #2e3954;

  &:focus {
    outline: none;
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

export default UpdateCalendarEventPopup;
