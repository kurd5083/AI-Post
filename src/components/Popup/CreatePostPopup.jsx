import styled from "styled-components";
import create_post  from "@/assets/popup/create-post-sec.svg";
import BtnBase from "@/shared/BtnBase";

const CreatePostPopup = () => {
  return (
    <CreatePostContainer>
      <img src={create_post} alt="create post icon" width={123} height={113}/>
      <CreatePostTitle>Генерируем пост</CreatePostTitle>
      <CreatePostText>Это может занять несколько минут...</CreatePostText>
      <BtnBase $color="#AC60FD" $bg="#201F39">Отменить генерирование</BtnBase>
    </CreatePostContainer>
  )
}

const CreatePostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 165px;
  @media(max-width: 480px) {
    margin-top: 80px;
  }
`
const CreatePostTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 40px 0 24px;
  text-align: center;
`
const CreatePostText = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 32px;
  color: #6A7080;
  text-align: center;
  line-height: 24px;
`

export default CreatePostPopup