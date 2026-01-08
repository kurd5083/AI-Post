import styled from "styled-components";
import link_generation from "@/assets/popup/link-generation.svg";
import { usePopupStore } from "@/store/popupStore"
import BtnBase from "@/shared/BtnBase";
import { useGetChannelInviteLinks } from "@/lib/channels/invite-link/useGetChannelInviteLinks";

const LinkGenerationPrevPopup = () => {
  const { popup, changeContent } = usePopupStore()
  const channelId = popup?.data?.channelId;
  const { links } = useGetChannelInviteLinks(channelId);
  return (
    <LinkGenerationContainer>
      <img src={link_generation} alt="link generation icon" width={123} height={113} />
      <LinkGenerationTitle>
        {links?.length > 0
          ? "Пригласительные ссылки"
          : "Пригласительных ссылок пока нет"}
      </LinkGenerationTitle>

      <LinkGenerationText>
        {links?.length > 0
          ? `Создайте ссылку по кнопке ниже. Отслеживать ссылки можно по кнопке "Мои ссылки"`
          : "Создайте первую ссылку для приглашения пользователей в канал"}
      </LinkGenerationText>

      <Buttons>
        <BtnBase onClick={() => changeContent("link_generation")} $color="#FC5B5B" $bg="#29212F">+ Создать ссылку</BtnBase>
        <BtnBase onClick={() => changeContent("my_link_generation")} $color="#D6DCEC" $bg="#1C212F" $padding="21px 52px">Мои ссылки</BtnBase>
      </Buttons>
    </LinkGenerationContainer>
  )
}

const LinkGenerationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 165px;
  padding: 0 56px 30px;

  @media(max-width: 1600px) {
    padding: 0 32px 30px;
  }
  @media(max-width: 768px) {
    padding: 0 24px 30px;
  }
  
  @media(max-width: 480px) {
    margin-top: 80px;
  }
`
const LinkGenerationTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 40px 0 24px;
  text-align: center;
`
const LinkGenerationText = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 32px;
  color: #6A7080;
  text-align: center;
  line-height: 24px;
`
const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media(max-width: 480px) {
    flex-direction: column;
    
    button {
      width: 100%;
    }
  }
`
export default LinkGenerationPrevPopup