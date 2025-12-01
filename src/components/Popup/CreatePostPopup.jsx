import styled from "styled-components";
import create_post  from "@/assets/popup/create-post-sec.svg";

const CreatePostPopup = () => {
  return (
    <CreatePostContainer>
      <img src={create_post} alt="create post icon" width={123} height={113}/>
      <CreatePostTitle>Генерируем пост</CreatePostTitle>
      <CreatePostText>Это может занять несколько минут...</CreatePostText>
      <CreatePostBtn>Отменить генерирование</CreatePostBtn>
    </CreatePostContainer>
  )
}

const CreatePostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 165px;
`
const CreatePostTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    margin: 40px 0 24px;
`
const CreatePostText = styled.p`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 32px;
    color: #6A7080;
`
const CreatePostBtn = styled.button`
    border-radius: 12px;
    font-weight: 700;
    background-color: #1F1E38;
    color: #AC60FD;
    padding: 21px 32px;
`

export default CreatePostPopup
