import { useState } from "react";
import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore";
import CloseIcon from "@/icons/CloseIcon";

const ChangeTimePopup = () => {
  const { closePopup } = usePopupStore();
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

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

  return (
    <div>
      <ChangeTimeHead>
        <HeadTitle>Изменить время</HeadTitle>
        <CloseButton>
					<CloseIcon color="#336CFF" onClick={closePopup} />
				</CloseButton>
      </ChangeTimeHead>
      <ChangeTimeSubtitle>Выберите время в которое будет удобнее опубликовать пост</ChangeTimeSubtitle>
      <TimeWrapper>
        <TimeInputField
          type="text"
          value={hours}
          onChange={handleHoursChange}
          placeholder="00"
        />
        <Colon>:</Colon>
        <TimeInputField
          type="text"
          value={minutes}
          onChange={handleMinutesChange}
          placeholder="00"
        />
      </TimeWrapper>
      <ChangeTimeButtons>
        <BtnBase $color="#D6DCEC" $bg="#336CFF">Сохранить</BtnBase>
        <BtnBase onClick={closePopup} $color="#D6DCEC" $bg="#242A3A">Отменить</BtnBase>
      </ChangeTimeButtons>
    </div>
  );
};

const ChangeTimeHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  img {
    cursor: pointer;
  }
`;
const HeadTitle = styled.h2`
  font-size: 32px;
  line-height: 32px;
  font-weight: 700;
  @media(max-width: 480px) {
    font-size: 24px;
    line-height: 24px;
  }
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
  line-height: 20px;
  font-weight: 700;
  margin-top: 24px;
`;
const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 48px;
  padding: 0 30px;
  @media(max-width: 480px) {
    padding: 0 20px;
  }
`;
const TimeInputField = styled.input`
  font-size: 64px;
  line-height: 64px;
  font-weight: 700;
  max-width: 100px;
  background-color: transparent;
  border: none;
  color: #D6DCEC;
  text-align: center;

  &:focus {
    outline: none;
  }
`;
const Colon = styled.span`
  color: #6A7080;
  font-size: 64px;
  line-height: 64px;
  font-weight: 700;
  margin-top: -8px;
`;
const ChangeTimeButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 48px;

  button {
    width: 100%;
    justify-content: center;
  }
`;

export default ChangeTimePopup;