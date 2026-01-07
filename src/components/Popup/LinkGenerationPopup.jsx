import { useState } from "react";
import styled from "styled-components";
import { usePopupStore } from "@/store/popupStore";
import CheckboxText from "@/shared/CheckboxText";
import CustomSelect from "@/shared/CustomSelect";
import BtnBase from "@/shared/BtnBase";
import { useCreateChannelInviteLink } from "@/lib/channels/invite-link/useCreateChannelInviteLink";
import { useNotificationStore } from "@/store/notificationStore";

const LinkGenerationPopup = () => {
  const { popup, goBack } = usePopupStore();
  const channelId = popup?.data?.channelId;

  const { mutate: createInviteLink, isPending: linkPending } = useCreateChannelInviteLink(channelId);
  const { addNotification } = useNotificationStore();

  const [createsJoinRequest, setCreatesJoinRequest] = useState(false);
  const [name, setName] = useState("");
  const [memberLimit, setMemberLimit] = useState(null);
  const [expirePeriod, setExpirePeriod] = useState(null);

  const handleCreate = () => {
    if (name.length > 100) {
      return addNotification("Название ссылки не должно превышать 100 символов", "info");
    }

    if (!createsJoinRequest && memberLimit) {
      const numLimit = Number(memberLimit);
      if (isNaN(numLimit) || numLimit <= 0) {
        return addNotification("Лимит участников должен быть положительным числом", "info");
      }
    }

    let customExpireDate = null;
    const now = new Date();

    if (expirePeriod) {
      switch (expirePeriod) {
        case "ONE_HOUR": now.setHours(now.getHours() + 1); break;
        case "ONE_DAY": now.setDate(now.getDate() + 1); break;
        case "ONE_WEEK": now.setDate(now.getDate() + 7); break;
      }
      const yyyy = now.getUTCFullYear();
      const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
      const dd = String(now.getUTCDate()).padStart(2, "0");
      const hh = String(now.getUTCHours()).padStart(2, "0");
      const min = String(now.getUTCMinutes()).padStart(2, "0");
      const ss = String(now.getUTCSeconds()).padStart(2, "0");

      customExpireDate = `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}Z`;
    }

    createInviteLink(
      {
        name: name || null,
        memberLimit: createsJoinRequest ? null : memberLimit ? Number(memberLimit) : null,
        expirePeriod,
        customExpireDate,
        createsJoinRequest,
      },
      {
        onSuccess: () => {
          addNotification("Ссылка успешно создана", "success");
          setCreatesJoinRequest(false);
          setName("");
          setMemberLimit(null);
          setExpirePeriod(null);
        },
        onError: () => {
          addNotification("Ошибка при создании ссылки", "error");
        }
      }
    );
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
        {!createsJoinRequest && (
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
                { value: "1", label: "1" },
                { value: "10", label: "10" },
                { value: "50", label: "50" },
                { value: "100", label: "100" },
              ]}
              value={memberLimit}
              onChange={(option) => setMemberLimit(option.value)}
            />
          </LinkGenerationItem>
        )}
        <LinkGenerationItem>
          <ItemTitle>Срок действия</ItemTitle>
          <ItemDesc>
            Вы можете выбрать срок действия для этой ссылки.
          </ItemDesc>
          <CheckboxText
            options={[
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
          disabled={linkPending}
        >
          {linkPending ? "Создаем..." : "Создать ссылку"}
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
