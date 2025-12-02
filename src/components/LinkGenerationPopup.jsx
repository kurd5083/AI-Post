import styled from "styled-components";
import link_generation  from "@/assets/popup/link-generation.svg";

const LinkGenerationPopup = () => {
  return (
    <LinkGenerationContainer>
      <img src={link_generation} alt="link generation icon" width={123} height={113}/>
      <LinkGenerationTitle>Пригласительных ссылок пока нет</LinkGenerationTitle>
      <LinkGenerationText>Создайте первую ссылку для приглашения пользователей в канал</LinkGenerationText>
      <LinkGenerationBtn>+ Создать ссылку</LinkGenerationBtn>
    </LinkGenerationContainer>
  )
}
const LinkGenerationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 165px;
`
const LinkGenerationTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    margin: 40px 0 24px;
`
const LinkGenerationText = styled.p`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 32px;
    color: #6A7080;
`
const LinkGenerationBtn = styled.button`
    border-radius: 12px;
    font-weight: 700;
    background-color: #29212F;
    color: #FC5B5B;
    padding: 21px 32px;
`

export default LinkGenerationPopup
