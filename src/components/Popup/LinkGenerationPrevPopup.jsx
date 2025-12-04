import styled from "styled-components";
import link_generation  from "@/assets/popup/link-generation.svg";
import { usePopupStore } from "@/store/popupStore"
import BtnSave from "@/shared/BtnSave";

const LinkGenerationPrevPopup = () => {
  const { changeContent } = usePopupStore()
  return (
    <LinkGenerationContainer>
      <img src={link_generation} alt="link generation icon" width={123} height={113}/>
      <LinkGenerationTitle>Пригласительных ссылок пока нет</LinkGenerationTitle>
      <LinkGenerationText>Создайте первую ссылку для приглашения пользователей в канал</LinkGenerationText>
      <BtnSave onClick={() => changeContent("link_generation")} $color="#FC5B5B" $bg="#29212F" $margin="0">+ Создать ссылку</BtnSave>
    </LinkGenerationContainer>
  )
}
const LinkGenerationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 165px;
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