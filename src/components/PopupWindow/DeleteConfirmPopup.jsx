import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import CloseIcon from "@/icons/CloseIcon";
import { usePopupStore } from "@/store/popupStore";

const DeleteConfirmPopup = () => {
  const { popup, closePopup } = usePopupStore();

  const handleDelete = () => {
    if (popup?.data?.onDelete) {
      popup.data.onDelete();
    }
    closePopup();
  };

  return (
    <div>
      <DeleteHead>
        <HeadTitle>Подтвердите удаление</HeadTitle>
        <CloseButton onClick={closePopup}>
          <CloseIcon color="#336CFF"/>
        </CloseButton>
      </DeleteHead>
      <DeleteSubtitle>
        Вы действительно хотите удалить "{popup?.data?.itemName}"? Это действие нельзя будет отменить.
      </DeleteSubtitle>
      <PopupButtons>
        <BtnBase
          $color="#D6DCEC"
          $bg="#FF4D4D"
          onClick={handleDelete}
        >
          Удалить
        </BtnBase>
        <BtnBase
          onClick={closePopup}
          $color="#D6DCEC"
          $bg="#242A3A"
        >
          Отменить
        </BtnBase>
      </PopupButtons>
    </div>
  );
};

const DeleteHead = styled.div`
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
const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DeleteSubtitle = styled.p`
  color: #6a7080;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  margin-top: 24px;
`;
const PopupButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 48px;

  button {
    width: 100%;
    justify-content: center;
  }
`;

export default DeleteConfirmPopup;
