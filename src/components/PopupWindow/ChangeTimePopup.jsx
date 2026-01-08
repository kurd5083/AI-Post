import { useState } from "react";
import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import CloseIcon from "@/icons/CloseIcon";
import { usePopupStore } from "@/store/popupStore";
import { usePostsStore } from "@/store/postsStore";

const ChangeTimePopup = () => {
  const { popup, goBack } = usePopupStore();
  const { setPostTime, getPostTime } = usePostsStore();

  const postId = popup?.data?.postId;
  const initial = getPostTime(postId); 

  const [hours, setHours] = useState(initial.split(":")[0]);
  const [minutes, setMinutes] = useState(initial.split(":")[1]);

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
    const time = `${hours}:${minutes}`;
    setPostTime(postId, time);
    goBack();
  };
  return (
    <PopupContainer onClick={() => goBack()}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <ChangeTimeHead>
          <HeadTitle>Изменить время</HeadTitle>
          <CloseButton onClick={() => goBack()}>
            <CloseIcon color="#336CFF" />
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
          <BtnBase $color="#D6DCEC" $bg="#336CFF" onClick={handleSave}>
            Сохранить
          </BtnBase>
          <BtnBase $color="#D6DCEC" $bg="#242A3A" onClick={() => goBack()}>
            Отменить
          </BtnBase>
        </ChangeTimeButtons>
      </PopupContent>
    </PopupContainer>
  );
};
const PopupContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    position: absolute;
    top: 0px;
    left: 0;
    padding: 120px 56px 30px;
    background-color: #121726ad;
    backdrop-filter: blur(30px);
    width: 100%;
    overflow-y: auto;
    scrollbar-width: none;
    max-height: 100dvh;
    height: 100%;
    z-index: 10;
    @media(max-width: 1600px) {
      padding: 120px 32px 30px;   
    }
    @media(max-width: 480px) {
      padding: 120px 24px 30px;   
    }
`
const PopupContent = styled.div`
    margin-top: 50px;
    box-sizing: border-box;
    max-width: 520px;
    width: 100%;
    background: #1c243860;
    border-radius: 32px;
    padding: 48px;
    @media(max-width: 480px) {
        margin-top: 30px;
        padding: 32px 24px;   
    }
`
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
  }
`;

export default ChangeTimePopup;