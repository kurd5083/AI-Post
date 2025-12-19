import { useState } from "react";
import styled from "styled-components";
import { usePopupStore } from "@/store/popupStore";
import CheckboxText from "@/shared/CheckboxText";
import CustomSelect from "@/shared/CustomSelect";
import BtnBase from "@/shared/BtnBase";
import { useCreateChannelInviteLink } from "@/lib/channels/useCreateChannelInviteLink";

const LinkGenerationPopup = () => {
  const { popup, goBack } = usePopupStore();
  const channelId = popup?.data?.channelId;

  const createInviteLink = useCreateChannelInviteLink(channelId);

  const [createsJoinRequest, setCreatesJoinRequest] = useState(false);
  const [name, setName] = useState("");
  const [memberLimit, setMemberLimit] = useState(null);
  const [expirePeriod, setExpirePeriod] = useState("UNLIMITED");

  const handleCreate = () => {
    createInviteLink.mutate({
      name: name || null,
      memberLimit: memberLimit ? Number(memberLimit) : null,
      expirePeriod,
      customExpireDate: null,
      createsJoinRequest,
    });
  };

  return (
    <LinkGenerationContainer>
      <LinkGenerationTitle>Настройка ссылки</LinkGenerationTitle>

      <LinkGenerationContent>
        <LinkGenerationItem>
          <ItemTitle>Заявки на вступление</ItemTitle>
          <ItemDesc>
            Новые подписчики смогут присоединиться к каналу без дополнительной
            <br /> проверки администраторами.
          </ItemDesc>
          <CheckboxText
            options={[
              { id: "on", label: "Вкл" },
              { id: "off", label: "Выкл" },
            ]}
            bg="#336CFF"
            value={createsJoinRequest ? "on" : "off"}
            onChange={(id) => setCreatesJoinRequest(id === "on")}
          />
        </LinkGenerationItem>

        <LinkGenerationItem>
          <ItemTitle>
            Название <mark>(необязательное)</mark>
          </ItemTitle>
          <ItemDesc>
            <mark>Название ссылки</mark> будут видеть только администраторы.
          </ItemDesc>
          <ItemInput
            type="text"
            placeholder="Название"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </LinkGenerationItem>

        <LinkGenerationItem>
          <ItemTitle>
            Лимит участников <mark>(необязательное)</mark>
          </ItemTitle>
          <ItemDesc>
            Максимальное количество пользователей, которые могут присоединиться
            по этой ссылке
          </ItemDesc>
          <CustomSelect
            placeholder="Лимит участников"
            options={[
              { value: null, label: "Не ограничено" },
              { value: "1", label: "1" },
              { value: "10", label: "10" },
              { value: "50", label: "50" },
              { value: "100", label: "100" },
            ]}
            onChange={(option) => setMemberLimit(option.value)}
          />
        </LinkGenerationItem>

        <LinkGenerationItem>
          <ItemTitle>Срок действия</ItemTitle>
          <ItemDesc>
            Вы можете выбрать срок действия для этой ссылки.
          </ItemDesc>
          <CheckboxText
            options={[
              { id: "UNLIMITED", label: "Без ограничений" },
              { id: "ONE_HOUR", label: "1 час" },
              { id: "ONE_DAY", label: "1 день" },
              { id: "ONE_WEEK", label: "1 нед." },
            ]}
            bg="#FC5B5B"
            value={expirePeriod}
            onChange={(id) => setExpirePeriod(id)}
          />
        </LinkGenerationItem>
      </LinkGenerationContent>

      <LinkGenerationButtons>
        <BtnBase
          $color="#D6DCEC"
          $bg="#336CFF"
          onClick={handleCreate}
          disabled={createInviteLink.isLoading}
        >
          {createInviteLink.isLoading ? "Создаем..." : "Создать ссылку"}
        </BtnBase>

        <BtnBase
          onClick={goBack}
          $color="#D6DCEC"
          $bg="#242A3A"
        >
          Отменить
        </BtnBase>
      </LinkGenerationButtons>
    </LinkGenerationContainer>
  );
};

const LinkGenerationContainer = styled.div`
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`
const LinkGenerationTitle = styled.h2`
  color: #6A7080;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 32px;
`
const LinkGenerationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`
const LinkGenerationItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`
const ItemTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;

  mark {
    color: #6A7080;
  }
`
const ItemDesc = styled.p`
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  color: #6A7080;

  mark {
    color: #FC5B5B;
  }
`
const ItemInput = styled.input`
  box-sizing: border-box;
  border: 2px solid #333E59;
  border-radius: 12px;
  background-color: transparent;
  max-width: 582px;
  width: 100%;
  padding: 16px 24px;
  font-size: 14px;
  font-weight: 700;
  color: #D6DCEC;
  
  &::placeholder {
    color: #D6DCEC;
  }
`
const LinkGenerationButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 32px;
`

export default LinkGenerationPopup
