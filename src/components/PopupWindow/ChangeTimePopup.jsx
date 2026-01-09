import { useState } from "react";
import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import CloseIcon from "@/icons/CloseIcon";
import { usePopupStore } from "@/store/popupStore";
import { usePostsStore } from "@/store/postsStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNotificationStore } from "@/store/notificationStore";

const ChangeTimePopup = () => {
  const { popup, goBack } = usePopupStore();
  const { setPostTime, getPostTime } = usePostsStore();
  const { addNotification } = useNotificationStore();

  const postId = popup?.data?.postId;
  const initial = getPostTime(postId);
  const [initHours, initMinutes] = initial.time ? initial.time.split(":") : ["00", "00"];

  const [date, setDate] = useState(initial.date ? new Date(initial.date) : new Date());
  const [hoursState, setHours] = useState(initHours);
  const [minutesState, setMinutes] = useState(initMinutes);

  const handleHoursChange = (e) => {
    let value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 2) {
      if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 23)) {
        setHours(value);
      }
    }
  };

  const handleMinutesChange = (e) => {
    let value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length <= 2) {
      if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 59)) {
        setMinutes(value);
      }
    }
  };

  const handleSave = () => {
    const fixedHours = hoursState.padStart(2, "0");
    const fixedMinutes = minutesState.padStart(2, "0");

    const resultDateTime = new Date(date);
    resultDateTime.setHours(parseInt(fixedHours, 10));
    resultDateTime.setMinutes(parseInt(fixedMinutes, 10));
    resultDateTime.setSeconds(0);
    resultDateTime.setMilliseconds(0);

    const offset = resultDateTime.getTimezoneOffset();
    resultDateTime.setMinutes(resultDateTime.getMinutes() - offset);

    setPostTime(postId, {
      date: resultDateTime.toISOString(),
      time: `${hoursState.padStart(2, "0")}:${minutesState.padStart(2, "0")}`
    });

    goBack();
  };

  return (
    <>
      <ChangeTimeHead>
        <HeadTitle>Изменить дату и время</HeadTitle>
        <CloseButton onClick={() => goBack()}>
          <CloseIcon color="#336CFF" />
        </CloseButton>
      </ChangeTimeHead>

      <ChangeTimeSubtitle>Выберите дату публикации</ChangeTimeSubtitle>

      <DatePickerWrapper>
        <StyledDatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          dateFormat="dd.MM.yyyy"
          locale="ru"
          wrapperClassName="picker-wrapper"
        />
      </DatePickerWrapper>
      <FieldDescription>
        Выберите дату, когда пост должен быть опубликован.
        Убедитесь, что выбранная дата не находится в прошлом.
      </FieldDescription>

      <ChangeTimeSubtitle>Выберите время</ChangeTimeSubtitle>

      <TimeWrapper>
        <TimeInputField
          type="text"
          value={hoursState}      
          onChange={handleHoursChange}
          placeholder="00"
        />
        <Colon>:</Colon>
        <TimeInputField
          type="text"
          value={minutesState}
          onChange={handleMinutesChange}
          placeholder="00"
        />
      </TimeWrapper>
      <FieldDescription>
        Укажите время публикации в 24-часовом формате. Например, 14:30 для 2:30 дня.
      </FieldDescription>

      <ChangeTimeButtons>
        <BtnBase $color="#D6DCEC" $bg="#336CFF" onClick={handleSave}>
          Сохранить
        </BtnBase>
        <BtnBase $color="#D6DCEC" $bg="#242A3A" onClick={() => goBack()}>
          Отменить
        </BtnBase>
      </ChangeTimeButtons>
    </>
  );
};

const ChangeTimeHead = styled.div`
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

const ChangeTimeSubtitle = styled.p`
  color: #6a7080;
  font-size: 14px;
  font-weight: 700;
  margin-top: 24px;
`;
const FieldDescription = styled.span`
  font-size: 12px;
  color: #6a7080;
  margin-top: 4px;
  line-height: 1.4;
`;
const DatePickerWrapper = styled.div`
  margin-top: 16px;
`;
const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  font-size: 20px;
  padding: 12px;
  background: transparent;
  border: 1px solid #6a7080;
  color: #d6dcec;
  border-radius: 8px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #336cff;
  }
`;
const TimeWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  border: 1px solid #6a7080;
  border-radius: 8px;
  background: transparent;
  color: #d6dcec;
  cursor: text;
  margin-top: 16px;
  &:focus-within {
    border-color: #336cff;
  }
`;
const TimeInputField = styled.input`
  width: 50px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  border: none;
  background: transparent;
  color: #d6dcec;


  &:focus {
    outline: none;
  }
`;

const Colon = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #6a7080;
`;

const ChangeTimeButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 48px;

  button {
    width: 100%;
  }
`;

export default ChangeTimePopup;
