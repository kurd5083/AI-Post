import { useState, useEffect } from "react";
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
import useResolution from "@/lib/useResolution";
import { useCreatePost } from "@/lib/posts/useCreatePost";
import CustomSelect from "@/shared/CustomSelect";
import { useChannelSources } from "@/lib/channels/sources/useChannelSources";
import PreviewBG from "@/assets/ai-generator/PreviewBG.png";
import eye_blue from "@/assets/eye-blue.svg";
import arrow from "@/assets/arrow.svg";
import TimeInput from "@/shared/TimeInput";
import PlusIcon from "@/icons/PlusIcon";

const CreatePostManuallyPopup = () => {
  const { isSmall } = useResolution(480);
  const { popup, changeContent, goBack } = usePopupStore()
  console.log(popup, 'ttttttttttttt')

  const channelId = popup?.data?.channelId;

  const { sources } = useChannelSources(channelId);

  const [postTitle, setPostTitle] = useState("");
  const [postSource, setPostSource] = useState("");
  const [postText, setPostText] = useState("");
  const [postTime, setPostTime] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const { mutate: createPost } = useCreatePost();

  console.log(postTime, 'fhhdfh')

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1400) {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSave = () => {
    createPost({
      text: postText,
      channelId: channelId,
      title: postTitle,
      summary: '1',
      publishedAt: postTime ? `2025-01-01T${postTime}:00` : null,
      source: postSource,
      images: ['']
    });
  };

  return (
    <PostManually>
      <NewPostLeft>
        <PostTitle>Заголовок</PostTitle>
        <PostInput
          type="text"
          placeholder="Новый пост"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <PostSetting>
          <PostSettingTop>
            <BtnBase $color="#EF6284" $bg="#26202F" $padding="21px 24px">Настройки</BtnBase>
            <BtnBase $color="#336CFF" $bg="#161F37" $padding="21px 24px">
              <PromotionIcon color="#336CFF" />{!isSmall ? 'Опубликовать сейчас' : 'Опубликовать'}
            </BtnBase>
          </PostSettingTop>
          <PostTime>
            <PostTimeTitle>Выберите время публикации</PostTimeTitle>
            <PostTimeContainer>
              <TimeInput
                hours={hours}
                minutes={minutes}
                onChange={(newHours, newMinutes) => {
                  setHours(newHours);
                  setMinutes(newMinutes);
                }}
              />
              <PostTimeBtn
                onClick={() => {
                  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
                  setPostTime(formattedTime);
                }}
              >
                <PlusIcon color="#FFF980" />
              </PostTimeBtn>
            </PostTimeContainer>
            {postTime && (
              <PostTimeResult>
                Будет публиковаться в <mark>{postTime}</mark>
              </PostTimeResult>
            )}
          </PostTime>
          {/* <BtnBase
            $color="#6A7080"
            $bg="transparent"
            $border={true}
            onClick={() =>
              changeContent("change_time", "popup_window", {
                currentTime: postTime,
                onSave: (time) => {
                  console.log("onSave received:", time);
                  setPostTime(time, 'gggggggggg');
                },
              })
            }
          >
            <TimeIcons />
            {postTime ? `Время: ${postTime}` : "Изменить время"}
          </BtnBase> */}
        </PostSetting>
      </NewPostLeft>
      <PostRight>
        <PostCreate>
          <PostSourceSelect>
            <p>Источник:</p>
            <CustomSelect
              padding={false}
              border={false}
              value={postSource}
              onChange={(option) => setPostSource(option.value)}
              options={
                sources?.map((source) => ({
                  value: source.name,
                  label: source.name,
                })) ?? []
              }
            />
            <SourcePost width="16" height="16" />
          </PostSourceSelect>
          <PostTitle>Описание</PostTitle>
          <PostCreateContainer>
            <PostCreateContainerTitle><CheckboxCircle />Пост 1</PostCreateContainerTitle>
            <textarea
              placeholder="Текст публикации..."
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            ></textarea>
            <CreateAI>
              <p><img src={create} alt="create icon" />Создать фото с AI</p>
              <p><AiGeneratorIcon color="#336CFF" />Написать с AI</p>
            </CreateAI>
            <CreateActionsAdd>
              <AiGeneratorIcon color="#336CFF" width="24" height="24" />
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
        {/* <Buttons> */}
        {/* <HideButton>
            <img src={hide} alt="hide icon" width={24} height={17} />
          </HideButton>
          <DeleteButton>
            <img src={del} alt="del icon" width={14} height={16} />
          </DeleteButton> */}
        {/* <BtnBase $padding="19px 46px">
            Сохранить
          </BtnBase> */}
        {/* </Buttons> */}
      </PostRight>

      <GeneratorPreview $collapsed={collapsed}>
        <PreviewContent>
          <PreviewHead>
            <HeadLeft><img src={eye_blue} alt="eye icon" />Лайв превью</HeadLeft>
            <HeadArrow src={arrow} alt="arrow icon" onClick={() => setCollapsed(prev => !prev)} $collapsed={collapsed} />
          </PreviewHead>
          {!collapsed && (
            <>
              {/* <PreviewSelect>
                <CustomSelect
                  placeholder="Все платформы"
                  options={[
                    { value: "Telegram", label: "Telegram" },
                  ]}
                  width="220px"
                  fs="14px"
                  padding="16px"
                />
                <PreviewHeadButton>
                  <BtnBase $padding="16px 24px">Telegram</BtnBase>
                </PreviewHeadButton>
              </PreviewSelect> */}
              <PreviewInfo>
                <PreviewInfoBG src={PreviewBG} alt="bg" />
                <PreviewInfoContent>
                  <PreviewInfoText>
                    🎯 Breaking: Sustainable<br /><br />
                    Technology reaches new milestone! We're
                    excited to share this incredible
                    achievement with our community. This
                    wouldn't be possible without your continued
                    support and feedback.<br /><br />
                    🔥 What's next? • Enhanced features • Expanded
                    capabilities • Even better user experience Stay
                    tuned for more updates! 🚀
                  </PreviewInfoText>
                  <BtnBase $padding="17px" $bg="#243D56" $color="#D6DCEC">🚀 Начать</BtnBase>
                </PreviewInfoContent>
              </PreviewInfo>
              {/* <PreviewButtons>
                <ButtonBlock>
                  <PreviewButton><img src={text} alt="text icon" width={24} height={17} /></PreviewButton>
                  <p>EDIT TEXT</p>
                </ButtonBlock>
                <ButtonBlock>
                  <PreviewButton><img src={img} alt="img icon" width={14} height={16} /></PreviewButton>
                  <p>EDIT IMAGE</p>
                </ButtonBlock>
                <ButtonBlock>
                  <PreviewButton><img src={copy} alt="copy icon" width={24} height={17} /></PreviewButton>
                  <p>COPY TEXT</p>
                </ButtonBlock>
              </PreviewButtons> */}
            </>
          )}
        </PreviewContent>
        {/* <PreviewPublish>
          <BtnBase $padding="32px" $bg="#336CFF" $color="#D6DCEC">
            <img src={publish} alt="publish icon" />
            Опубликовать записи
          </BtnBase>
        </PreviewPublish> */}
        {/* <AddPost>
          <BtnBase $padding="21px 24px">
            + Добавить пост
          </BtnBase>
        </AddPost> */}
      </GeneratorPreview>
      <PostLeftButtons>
        <PostGenerate>
          <BtnBase $color="#FF7F48" $bg="#28222B"><AiGeneratorIcon color="#FF7F48" />Перегенерировать пост</BtnBase>
          <BtnBase $color="#FF7F48" $bg="#28222B"><img src={create} alt="create icon" />Сгенерировать изображение</BtnBase>
        </PostGenerate>
        <PostButtons>
          <BtnBase $color="#D6DCEC" $bg="#336CFF" onClick={handleSave}>Сохранить</BtnBase>
          <BtnBase onClick={goBack} $color="#D6DCEC" $bg="#242A3A">Отменить</BtnBase>
        </PostButtons>
      </PostLeftButtons>
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
    padding: 0 24px;
  }
`
const NewPostLeft = styled.div`
  max-width: 470px;
  grid-column: 1 /span 3;
  grid-row: 1;

  @media(max-width: 768px) {
    grid-column: 1 /span 6;
    grid-row: 2;
    max-width: 100%;
    width: 100%;
  }
  @media(max-width: 480px) {
    margin-bottom: 60px;
  }

`
const PostLeftButtons = styled.div`
  max-width: 470px;
  grid-column: 1 /span 3;
  grid-row: 3;

  @media(max-width: 768px) {
    grid-column: 1 /span 6;
    grid-row: 4;
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
const PostTime = styled.div`
  margin-top: 40px;
`
const PostTimeTitle = styled.h2`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  color: #6A7080;
  margin-bottom: 26px;
`
const PostTimeContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  width: min-content;
`
const PostTimeResult = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  margin-top: 32px;

  mark {
    color: #FFF980;
  }
`
const PostTimeBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background-color: #262A2D;
  border-radius: 50%;
  cursor: pointer;
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
  grid-column: 1 /span 3;
  grid-row: 2;
  max-width: 470px;
  width: 100%;

  @media(max-width: 768px) {
    max-width: 100%;
    grid-column: 1 /span 6;
    grid-row: 3;
  }
`
const PostCreate = styled.div`
`
const PostSourceSelect = styled.div`
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
// const Buttons = styled.div`
//   display: flex;
//   margin-top: 16px;
// `;
// const BaseButton = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 56px;
//   height: 56px;
//   border-radius: 12px;
//   flex-shrink: 0;
//   transition: all 0.2s;
// `;
// const HideButton = styled(BaseButton)`
//   border: 2px solid #2D3241;
//   margin-right: 8px;
// `;
// const DeleteButton = styled(BaseButton)`
//   border: 2px solid #2D3241;
//   margin-right: 16px;

//   &:hover {
//     border: none;
//     background-color: rgba(239, 98, 132, 0.08);
//   }
// `

/////////////////////////////////////
const GeneratorPreview = styled.div`
  padding-bottom: 30px;
  grid-column: 4 / span 3;
  grid-row: 1 /span 2;

  @media(max-width: 768px) {
    grid-column: 1 /span 6;
    grid-row: 1;
    padding-bottom: 0px;
  }
`;
const PreviewContent = styled.div`
  background-color: #181E30;
  border-radius: 24px;
  padding: 32px;
`;
const PreviewHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`
const HeadLeft = styled.h2`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 24px;
  font-weight: 800;
`
const HeadArrow = styled.img`
  display: none;
  transform: rotate(90deg);
  cursor: pointer;
  transition: transform 0.3s ease;
  ${({ $collapsed }) => $collapsed && `transform: rotate(270deg);`}
  @media(max-width: 768px) {
    display: block;
  }
`
// const PreviewButtons = styled.div`
//   display: flex;
//   justify-content: space-around;
//   margin-top: 55px;
// `;
// const ButtonBlock = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 16px;
//   p {
//     color: #6A7080;
//     font-size: 12px;
//     font-weight: 700;
//     text-transform: uppercase;
//   }
// `;
// const PreviewButton = styled(BaseButton)`
//   border: 2px solid #2D3241;
// `;
// const PreviewPublish = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 16px;
//   font-size: 24px;
//   font-weight: 800;
//   button {
//     margin-top: 16px;
//     display: flex;
//     justify-content: center;
//     width: 100%;
//     text-align: center;
//   }
// `
// const PreviewSelect = styled.div`
//   margin-top: 28px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `
// const PreviewHeadButton = styled.div`
//   @media(max-width: 480px) {
//     display: none;
//   }
// `
const PreviewInfo = styled.div`
  position: relative;
  margin-top: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const PreviewInfoBG = styled.img`
  position: absolute;
  border-radius: 24px;
  width: 100%;
  height: calc(100% + 46px);
  object-fit: cover;
`
const PreviewInfoContent = styled.div`
  position: relative;
  width: calc(100% - 104px);
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 1;
  button {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  @media(max-width: 1600px) {
    width: calc(100% - 28px);
  } 
`
const PreviewInfoText = styled.p`
  box-sizing: border-box;
  padding: 24px;
  background-color: #131C22;
  border-radius: 24px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
`
export default CreatePostManuallyPopup