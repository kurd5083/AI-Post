import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore";
import { useDeleteItem } from "@/lib/useDeleteItem"; // твоя функция удаления из API

const DeleteConfirmPopup = () => {
  const { popup, closePopup } = usePopupStore();
  const { mutate: deleteItem, isPending } = useDeleteItem();

  const handleDelete = () => {
    if (!popup?.data?.itemId) return;
    deleteItem(popup.data.itemId, {
      onSuccess: () => closePopup(),
    });
  };

  return (
    <div>
      <PopupHead>
        <HeadTitle>Подтвердите удаление</HeadTitle>
        <CloseBtn onClick={closePopup}>×</CloseBtn>
      </PopupHead>
      <PopupMessage>
        Вы действительно хотите удалить "{popup?.data?.itemName}"? Это действие нельзя будет отменить.
      </PopupMessage>
      <PopupButtons>
        <BtnBase
          $color="#D6DCEC"
          $bg="#FF4D4D"
          $padding="21px"
          onClick={handleDelete}
          disabled={isPending}
        >
          {isPending ? "Удаление..." : "Удалить"}
        </BtnBase>
        <BtnBase
          onClick={closePopup}
          $color="#D6DCEC"
          $bg="#242A3A"
          $padding="21px"
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
  gap: 20px;
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

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #336CFF;
  font-size: 32px;
  cursor: pointer;
`;

const PopupMessage = styled.p`
  color: #6A7080;
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