import styled from "styled-components";
import link_generation  from "@/assets/popup/link-generation.svg";
import { usePopupStore } from "@/store/popupStore"
import BtnBase from "@/shared/BtnBase";

const LinkGenerationPrevPopup = () => {
  const { changeContent } = usePopupStore()
  return (
    <LinkGenerationContainer>
      <img src={link_generation} alt="link generation icon" width={123} height={113}/>
      <LinkGenerationTitle>Пригласительных ссылок пока нет</LinkGenerationTitle>
      <LinkGenerationText>Создайте первую ссылку для приглашения пользователей в канал</LinkGenerationText>
      <BtnBase onClick={() => changeContent("link_generation")} $color="#FC5B5B" $bg="#29212F">+ Создать ссылку</BtnBase>
    </LinkGenerationContainer>
  )
}

const LinkGenerationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 165px;
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
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

export default LinkGenerationPrevPopup