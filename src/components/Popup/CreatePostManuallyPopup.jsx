import { useState } from "react";
import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore";
import create from "@/assets/create.svg";
import del from "@/assets/del.svg";
import hide from "@/assets/hide.svg";
import paper from "@/assets/ai-generator/paper.svg";
import img from "@/assets/ai-generator/img.svg";
import comment from "@/assets/ai-generator/comment.svg";
import map from "@/assets/ai-generator/map.svg";
import text from "@/assets/ai-generator/text.svg";
import setting from "@/assets/ai-generator/setting.svg";
import ellipsis from "@/assets/ai-generator/ellipsis.svg";
import CheckboxCircle from "@/shared/CheckboxCircle";
import PromotionIcon from "@/icons/PromotionIcon";
import AiGeneratorIcon from "@/icons/AiGeneratorIcon";
import TimeIcons from "@/icons/TimeIcons";
import SourcePost from "@/icons/SourcePost";

const CreatePostManuallyPopup = () => {
  const [post, setPost] = useState("");
  const { openPopup, goBack } = usePopupStore()

  return (
    <PostManually>
      <NewPostLeft>
        <PostTitle>Заголовок</PostTitle>
        <PostInput type="text" placeholder="Новый пост"/>
        <PostSetting>
          <PostSettingTop>
            <BtnBase $color="#EF6284" $bg="#26202F" $padding="21px 24px">Настройки</BtnBase>
            <BtnBase $color="#336CFF" $bg="#161F37" $padding="21px 24px"><PromotionIcon color="#336CFF"/>Опубликовать сейчас</BtnBase>
          </PostSettingTop>
          <BtnBase $color="#6A7080" $bg="transporent" $border={true} onClick={() => openPopup("change_time", "popup_window")} ><TimeIcons/>Изменить время</BtnBase>
        </PostSetting>
      </NewPostLeft>
      <PostLeftButtons>
        <PostGenerate>
          <BtnBase $color="#FF7F48" $bg="#28222B"><AiGeneratorIcon color="#FF7F48"/>Перегенерировать пост</BtnBase>
          <BtnBase $color="#FF7F48" $bg="#28222B"><img src={create} alt="create icon" />Сгенерировать изображение</BtnBase>
        </PostGenerate>
        <PostButtons>
          <BtnBase $color="#D6DCEC" $bg="#336CFF">Сохранить</BtnBase>
          <BtnBase onClick={goBack} $color="#D6DCEC" $bg="#242A3A">Отменить</BtnBase>
        </PostButtons>
      </PostLeftButtons>
      <PostRight>
        <PostCreate>
          <PostSource>
            <p>Источник: <mark>apple.com/home</mark></p>
            <SourcePost width="16" height="16"/>
          </PostSource>
          <PostTitle>Описание</PostTitle>
          <PostCreateContainer>
            <PostCreateContainerTitle><CheckboxCircle/>Пост 1</PostCreateContainerTitle>
            <textarea
                placeholder="Текст публикации..."
                value={post}
                onChange={(e) => setPost(e.target.value)}
              ></textarea>
            <CreateAI>
              <p><img src={create} alt="create icon" />Создать фото с AI</p>
              <p><AiGeneratorIcon color="#336CFF"/>Написать с AI</p>
            </CreateAI>
            <CreateActionsAdd>
              <AiGeneratorIcon color="#336CFF" width="24" height="24"/>
              <img src={paper} alt="paper icon" width={14} height={16} />
              <img src={img} alt="img icon" width={16} height={16} />
              <img src={comment} alt="comment icon" width={16} height={16} />
              <img src={map} alt="map icon" width={18} height={20} />
              <img src={text} alt="text icon" width={18} height={20} />
              <img src={setting} alt="setting icon" width={18} height={20} />
              <img src={ellipsis} alt="ellipsis icon" width={18} height={4} />
            </CreateActionsAdd>
          </PostCreateContainer>
        </PostCreate>
        <Buttons>
          <HideButton>
            <img src={hide} alt="hide icon" width={24} height={17} />
          </HideButton>
          <DeleteButton>
            <img src={del} alt="del icon" width={14} height={16} />
          </DeleteButton>
          <BtnBase $padding="19px 46px">
            Сохранить
          </BtnBase>
        </Buttons>
      </PostRight>
    </PostManually>
  )
}

const PostManually = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: min-content;
  gap: 70px;
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 991px) {
    gap: 30px;
  }
  @media(max-width: 768px) {
    flex-wrap: wrap;
    padding: 0 24px;
  }
`
const NewPostLeft = styled.div`
  max-width: 420px;
  grid-column: 1 /span 3;
  grid-row: 1;

  @media(max-width: 768px) {
    grid-column: 1 /span 6;
    grid-row: 1;
    max-width: 100%;
    width: 100%;
  }
  @media(max-width: 480px) {
    margin-bottom: 60px;
  }

`
const PostLeftButtons = styled.div`
  max-width: 420px;
  grid-column: 1 /span 3;
  grid-row: 2;

  @media(max-width: 768px) {
    grid-column: 1 /span 6;
    grid-row: 3;
    max-width: 100%;
    width: 100%;
  }
`
const PostSetting = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 40px;
  button {
   &:last-child {
    justify-content: center;
    width: 100%;
   }
  }
`
const PostSettingTop = styled.div`
  display: flex;
  gap: 8px;
`
const PostGenerate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  button {
    justify-content: center;
    width: 100%;
  }
`
const PostButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 64px;

  @media(max-width: 480px) {
    margin-top: 32px;
  }
`
const PostRight = styled.div`
  grid-column: 4 /span 3;
  grid-row: 1 / span 2;
  max-width: 470px;
  width: 100%;

  @media(max-width: 768px) {
    max-width: 100%;
    grid-column: 1 /span 6;
    grid-row: 2;
  }
`
const PostCreate = styled.div`
`
const PostSource = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border: 2px solid #333E59;
  padding: 16px 24px;
  border-radius: 12px;
  margin-bottom: 48px;

  @media(max-width: 480px) {
    margin-bottom: 32px;
  }
  p {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 14px;
    font-weight: 700;
    color: #6A7080;
    mark {
      color: #336CFF;
    }
  }
`

const PostTitle = styled.h2`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
  color: #6A7080;
`
const PostInput = styled.input`
  margin-top: 24px;
  background-color: transparent;
  width: 100%;
  color: #d6dcec;
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 24px;
  border: none;
  border-bottom: 2px solid #2e3954;

  &::placeholder {
    color: #d6dcec;
  }
`;
const PostCreateContainer = styled.div`
  margin-top: 24px;
  box-sizing: border-box;
  border-radius: 24px;
  border: 2px solid #333E59;
  padding: 32px;
  width: 100%;
  textarea {
    background-color: transparent;
    border: none;
    outline: none;
    color: #6A7080;
    resize: none;
    width: 100%;
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
    height: 140px;
    padding-top: 24px;
    scrollbar-width: none;
  }
`
const PostCreateContainerTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 24px;
  font-weight: 700;
`
const CreateAI = styled.div`
  display: flex;
  align-items: center;  
  flex-wrap: wrap;
  gap: 24px 40px;
  margin-top: 20px;
  p {
    display: flex;
    align-items: center;  
    gap: 16px;
    font-weight: 700;
    font-size: 14px;
    &:first-child {
      color: #FF7F48;
    }
    &:last-child {
      color: #336CFF;
    }
  }
`
const CreateActionsAdd = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 32px;
  margin-top: 32px;

  img {
    cursor: pointer;
  }
`
const Buttons = styled.div`
  display: flex;
  margin-top: 16px;
`;
const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  flex-shrink: 0;
  transition: all 0.2s;
`;
const HideButton = styled(BaseButton)`
  border: 2px solid #2D3241;
  margin-right: 8px;
`;
const DeleteButton = styled(BaseButton)`
  border: 2px solid #2D3241;
  margin-right: 16px;

  &:hover {
    border: none;
    background-color: rgba(239, 98, 132, 0.08);
  }
`

export default CreatePostManuallyPopup