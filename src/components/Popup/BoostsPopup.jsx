import { useState } from "react";
import styled from "styled-components";
import { usePopupStore } from "@/store/popupStore";
import BtnBase from "@/shared/BtnBase";
import Counter from "@/shared/Counter";
import { useCreateBoostOrder } from "@/lib/channels/useCreateBoostOrder";
import CheckboxText from "@/shared/CheckboxText";
import { useNotificationStore } from "@/store/notificationStore";

const BoostsPopup = () => {
  const { changeContent, popup } = usePopupStore();
  const channelId = popup?.data?.channelId;
  const { mutate: createBoostOrder, isPending: boostOrderPending } = useCreateBoostOrder();
  const { addNotification } = useNotificationStore();

  const [quantity, setQuantity] = useState(null);
  const [boostDays, setBoostDays] = useState(null);

  const handleStartBoost = () => {
    if (!quantity) {
      addNotification("Укажите количество бустов", "info");
      return;
    }
    if (!boostDays) {
      addNotification("Укажите срок действия буста", "info");
      return;
    }

    createBoostOrder(
      { channelId, quantity, boostDays },
      {
        onSuccess: () => {
          addNotification("Буст успешно создан!", "success");
        },
        onError: (err) => {
          console.error(err);
          addNotification("Ошибка при создании буста", "error");
        },
      }
    );
  };

  return (
    <BoostsContainer>
      <BoostsHead>
        <BoostsHeadText onClick={() => changeContent("promotion")}>Просмотр</BoostsHeadText>
        <BoostsHeadText $active={true}>Бусты</BoostsHeadText>
        <BoostsHeadText onClick={() => changeContent("my_orders")}>Мои заказы</BoostsHeadText>
      </BoostsHead>

      <BoostsBlock>
        <BlockTitle>Выберите количество бустов</BlockTitle>
        <Counter placeholder="Количество" value={quantity} onChange={setQuantity} />
      </BoostsBlock>

      <BoostsBlock>
        <BlockTitle>Срок действия (дни)</BlockTitle>
        <CheckboxText
          options={[
            { id: 1, label: "1 день" },
            { id: 7, label: "7 дней" },
            { id: 30, label: "30 дней" },
          ]}
          bg="#FC5B5B"
          value={boostDays}
          onChange={(id) => setBoostDays(Number(id))}
        />
      </BoostsBlock>
      <BtnBase
        $color="#D6DCEC"
        $bg="#2B89ED"
        onClick={handleStartBoost}
        disabled={boostOrderPending}
        $margin="40"
      >
        {boostOrderPending ? "Продвигаем..." : "Начать продвижение"}
      </BtnBase>
    </BoostsContainer>
  );
};

const BoostsContainer = styled.div`
  padding: 0 56px 30px;

  @media(max-width: 1600px) { padding: 0 32px 30px; }
  @media(max-width: 768px) { padding: 0 24px 30px; }

`;

const BoostsHead = styled.div` display: flex; gap: 32px; `;
const BoostsHeadText = styled.p`
  display: flex;
  gap: 32px;
  color: ${({ $active }) => $active ? '#D6DCEC' : '#6A7080'};
  padding-bottom: 32px;
  border-bottom: 2px solid ${({ $active }) => $active ? '#D6DCEC' : '#2E3954'};
  font-weight: 700;
  font-size: 24px;
  padding-right: 40px;
  cursor: pointer;
  @media(max-width: 480px) { padding-right: 0; }
`;

const BoostsBlock = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  @media(max-width: 480px) { margin-top: 32px; gap: 24px; }
`;

const BlockTitle = styled.h2` font-size: 24px; font-weight: 700; `;

export default BoostsPopup;