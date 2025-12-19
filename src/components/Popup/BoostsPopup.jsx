import { useState } from "react";
import styled from "styled-components";
import { usePopupStore } from "@/store/popupStore";
import BtnBase from "@/shared/BtnBase";
import Counter from "@/shared/Counter";
import { useCreateBoostOrder } from "@/lib/channels/useCreateBoostOrder";
import CheckboxText from "@/shared/CheckboxText";

const BoostsPopup = () => {
  const { changeContent, popup } = usePopupStore();
  const channelId = popup?.data?.channelId;
  const createBoostOrder = useCreateBoostOrder();

  const [quantity, setQuantity] = useState(null);
  const [boostDays, setBoostDays] = useState(null);

  const handleStartBoost = () => {
    if (!quantity || !boostDays) return;

    createBoostOrder.mutate({
      channelId,
      quantity,
      boostDays, // теперь число: 1, 7 или 30
    });
  };

  return (
    <BoostsContainer>
      <BoostsHead>
        <BoostsHeadText onClick={() => changeContent("promotion")}>Просмотр</BoostsHeadText>
        <BoostsHeadText $active={true}>Бусты</BoostsHeadText>
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

      <CostTitle>Стоимость:</CostTitle>
      <CostPrice>15.500<mark>,48</mark> руб.</CostPrice>

      <BoostsButtons>
        <BtnBase
          $color="#D6DCEC"
          $bg="#2B89ED"
          onClick={handleStartBoost}
          disabled={createBoostOrder.isLoading}
        >
          {createBoostOrder.isLoading ? "Продвигаем..." : "Начать продвижение"}
        </BtnBase>

        <BtnBase $color="#EF6284" $bg="#562F43">Купить бусты</BtnBase>
      </BoostsButtons>
    </BoostsContainer>
  );
};

const BoostsContainer = styled.div`
  padding: 0 56px;
  @media(max-width: 1600px) { padding: 0 32px; }
  @media(max-width: 768px) { padding: 0 24px; }
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
const CostTitle = styled.p` margin-top: 48px; font-size: 24px; font-weight: 700; `;
const CostPrice = styled.p`
  margin-top: 32px;
  font-size: 48px;
  font-weight: 700;
  mark { color: #6A7080; }
  @media(max-width: 480px) { font-size: 32px; }
`;

const BoostsButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 40px;
  @media(max-width: 480px) { flex-direction: column; gap: 64px; }
`;

export default BoostsPopup;
