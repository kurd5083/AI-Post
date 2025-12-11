import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore";
import close from "@/assets/close.svg";

const ChangeTimePopup = () => {
    const { closePopup } = usePopupStore();

    return (
        <div>
            <ChangeTimeHead>
                <HeadTitle>Изменить время</HeadTitle>
                <img
                    src={close}
                    alt="close icon"
                    onClick={closePopup}
                />
            </ChangeTimeHead>
            <ChangeTimeSubtitle>Выберите время в которое будет удобнее опубликовать пост</ChangeTimeSubtitle>
            <ChangeTimeButtons>
                <BtnBase $color="#D6DCEC" $bg="#336CFF">Сохранить</BtnBase>
                <BtnBase onClick={closePopup} $color="#D6DCEC" $bg="#242A3A">Отменить</BtnBase>
            </ChangeTimeButtons>
        </div>
    )
}
const ChangeTimeHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    cursor: pointer;
  }
`;
const HeadTitle = styled.h2`
  font-size: 32px;
  line-height: 32px;
  font-weight: 700;
`;
const ChangeTimeSubtitle = styled.p`
  color: #6a7080;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  margin-top: 24px;
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

export default ChangeTimePopup
