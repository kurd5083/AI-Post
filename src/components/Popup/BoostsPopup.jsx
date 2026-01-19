import { useState } from "react";
import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import BtnBase from "@/shared/BtnBase";
import Counter from "@/shared/Counter";
import CheckboxText from "@/shared/CheckboxText";

import { useCreateBoostOrder } from "@/lib/channels/useCreateBoostOrder";

import { useNotificationStore } from "@/store/notificationStore";
import { usePopupStore } from "@/store/popupStore";

const BoostsPopup = () => {
  const { changeContent, popup } = usePopupStore();
  const channelId = popup?.data?.channelId;
  const { mutate: createBoostOrder, isPending: boostOrderPending } = useCreateBoostOrder();
  const { addNotification } = useNotificationStore();

  const [quantity, setQuantity] = useState(null);
  const [boostDays, setBoostDays] = useState(null);

  const handleStartBoost = () => {
    if (!quantity || quantity < 10) {
      addNotification("Минимальное количество бустов — 10", "info");
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
          addNotification(err.message || "Ошибка при создании буста", "error");
        },
      }
    );
  };

  return (
    <BoostsContainer>
      <BoostsHead spaceBetween={32} slidesPerView="auto" grabCursor>
        <BoostsHeadTextSlide>
          <BoostsHeadText onClick={() => changeContent("promotion")}>Просмотр</BoostsHeadText>
        </BoostsHeadTextSlide>
        <BoostsHeadTextSlide>
          <BoostsHeadText $active={true}>Бусты</BoostsHeadText>
        </BoostsHeadTextSlide>
        <BoostsHeadTextSlide>
          <BoostsHeadText onClick={() => changeContent("my_orders")}>Мои заказы</BoostsHeadText>
        </BoostsHeadTextSlide>
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
      <BoostsButtons>
        <BtnBase
          $color="#D6DCEC"
          $bg="#2B89ED"
          onClick={handleStartBoost}
          disabled={boostOrderPending}
          $margin="40"
        >
          {boostOrderPending ? "Продвигаем..." : "Начать продвижение"}
        </BtnBase>
      </BoostsButtons>
    </BoostsContainer>
  );
};

const BoostsContainer = styled.div`
  padding-bottom: 30px;
`;

const BoostsHead = styled(Swiper)` 
  display: flex; 
  margin: 0; 
  padding: 0 56px;
  @media(max-width: 1600px) { padding: 0 32px }
  @media(max-width: 768px) { padding: 0 24px }
`;
const BoostsHeadTextSlide = styled(SwiperSlide)`
  width: fit-content;
`;
const BoostsHeadText = styled.p`
  font-family: "Montserrat Alternates", sans-serif;
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
  padding: 0 56px;
  @media(max-width: 1600px) { padding: 0 32px }
  @media(max-width: 768px) { padding: 0 24px }
  @media(max-width: 480px) { margin-top: 32px; gap: 24px; }
`;

const BlockTitle = styled.h2`font-family: "Montserrat Alternates", sans-serif; font-size: 24px; font-weight: 700; `;

const BoostsButtons = styled.div`
  padding: 0 56px;
  @media(max-width: 1600px) { padding: 0 32px }
  @media(max-width: 768px) { padding: 0 24px }
`;
export default BoostsPopup;