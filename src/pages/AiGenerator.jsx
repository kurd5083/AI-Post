import { useEffect, useState } from "react";
import styled from "styled-components";
import create from "@/assets/create.svg";
import BtnBase from "@/shared/BtnBase";
import del from "@/assets/del.svg";
import hide from "@/assets/hide.svg";
import paper from "@/assets/ai-generator/paper.svg";
import img from "@/assets/ai-generator/img.svg";
import comment from "@/assets/ai-generator/comment.svg";
import map from "@/assets/ai-generator/map.svg";
import text from "@/assets/ai-generator/text.svg";
import setting from "@/assets/ai-generator/setting.svg";
import ellipsis from "@/assets/ai-generator/ellipsis.svg";
import eye_blue from "@/assets/eye-blue.svg";
import publish from "@/assets/ai-generator/publish.svg";
import PreviewBG from "@/assets/ai-generator/PreviewBG.png";
import copy from "@/assets/copy.svg";
import TgIcon from "@/icons/TgIcon";
import arrow from "@/assets/arrow.svg";
import CheckboxCircle from "@/shared/CheckboxCircle";
import CustomSelect from "@/shared/CustomSelectSec";
import AiGeneratorIcon from "@/icons/AiGeneratorIcon";
import useFadeOnScroll from "@/lib/useFadeOnScroll";

const AiGenerator = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [posts, setPosts] = useState([]);

  const { fadeVisible, ref } = useFadeOnScroll(20);

  const handleAddPost = () => {
    const newPost = {
      id: Date.now(),
      title: `Новый пост ${posts.length + 1}`,
      progress: "0 / 1024",
      text: "Текст публикации...",
    };
    setPosts([newPost, ...posts]);
  };

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

  return (
    <GeneratorContainer>
      <GeneratorHead>
        <h2>
          <AiGeneratorIcon width={24} height={24} />
          AI Генератор
        </h2>
        <BtnBase $padding="21px 24px" onClick={handleAddPost}>
          + Добавить пост
        </BtnBase>
      </GeneratorHead>
      <GeneratorList $fadeVisible={fadeVisible} ref={ref}>
        {posts.map((post) => (
          <ListItem key={post.id}>
            <ItemHead>
              <CheckboxCircle><input value={post.title}/></CheckboxCircle>
              <p>{post.progress}</p>
            </ItemHead>
            <ItemText>{post.text}</ItemText>
            <ItemAI>
              <p><img src={create} alt="create icon" />Создать фото с AI</p>
              <p><AiGeneratorIcon color="#336CFF"/>Написать с AI</p>
            </ItemAI>
            <ItemActions>
              <ItemActionsAdd>
                <AiGeneratorIcon width={24} height={24} color="#336CFF" />
                <img src={paper} alt="paper icon" width={14} height={16} />
                <img src={img} alt="img icon" width={16} height={16} />
                <img src={comment} alt="comment icon" width={16} height={16} />
                <img src={map} alt="map icon" width={18} height={20} />
                <img src={text} alt="text icon" width={18} height={20} />
                <img src={setting} alt="setting icon" width={18} height={20} />
                <img src={ellipsis} alt="ellipsis icon" width={18} height={4} />
              </ItemActionsAdd>
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
            </ItemActions>
          </ListItem>
        ))}
      </GeneratorList>
      <GeneratorPreview $collapsed={collapsed}>
        <PreviewContent>
          <PreviewHead>
            <HeadLeft><img src={eye_blue} alt="eye icon" />Лайв превью</HeadLeft>
            <HeadArrow src={arrow} alt="arrow icon" onClick={() => setCollapsed(prev => !prev)} $collapsed={collapsed} />
          </PreviewHead>
          {!collapsed && (
            <>
              <PreviewSelect>
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
              </PreviewSelect>
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
              <PreviewButtons>
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
              </PreviewButtons>
            </>
          )}
        </PreviewContent>
        <PreviewPublish>
          <BtnBase $padding="32px" $bg="#336CFF" $color="#D6DCEC">
            <img src={publish} alt="publish icon" />
            Опубликовать записи
          </BtnBase>
        </PreviewPublish>
        <AddPost>
          <BtnBase $padding="21px 24px">
            + Добавить пост
          </BtnBase> 
        </AddPost>
      </GeneratorPreview>
    </GeneratorContainer>
  );
};

const GeneratorContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: min-content;
  align-items: start;
  gap: 16px;
  padding: 0 56px;
  margin-top: 24px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
  @media(max-width: 480px) {
    margin-top: 0px;
  }
`;
const GeneratorHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px;
  background-color: #181E30;
  border-radius: 24px;
  grid-column: 1 /span 3;
  grid-row: 1;
  @media(max-width: 1400px) {
    grid-column: 1 /span 5;
  }
  @media(max-width: 768px) {
    button {
      display: none;
    }
  }
  h2 {
    display: flex;
    align-items: center;
    gap: 22px;
    font-size: 24px;
    font-weight: 800;
    margin: 0;
  }
`;
const GeneratorList = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  grid-column:  1 / span 3;
  grid-row: 2;
  overflow-y: auto;
  scrollbar-width: none;
  max-height: calc(100dvh - 280px);
  padding-bottom: 30px;
  min-height: 500px;
  &::after {
    content: '';
    position: fixed;
    bottom: 0;
    margin-left: -24px;
    height: 135px;
    width: 100%;
    background: linear-gradient(to top, #131826, transparent);
    backdrop-filter: blur(8px);
    mask-image: linear-gradient(to top, black 50%, transparent);
    transition: opacity 0.2s;
    opacity: ${({ $fadeVisible }) => $fadeVisible ? 1 : 0};
    pointer-events: none;
		z-index: 1;
    @media(max-width: 1400px) {
      display: none;
    }
  }
  
  @media(max-width: 1600px) {
    gap: 104px;
    padding-bottom: 100px;
    max-height: calc(100dvh - 490px);
  } 
  @media(max-width: 1400px) {
    grid-column: 1 /span 5;
    grid-row: 3;
  }
  @media(max-width: 768px) {
    gap: 104px;
    padding-bottom: 100px;
    max-height: calc(100dvh - 550px);
  } 
`;
const ListItem = styled.div`
  position: relative;
  padding: 32px;
  border-radius: 24px;
  border: 2px solid #252D43;
`
const ItemHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 700;
  }
  p {
    font-size: 12px;
    font-weight: 700;
    color: #6A7080;
  }
`
const ItemText = styled.input`
  color: #6A7080;
  font-size: 16px;
  font-weight: 700;
  margin-top: 24px;
  @media(max-width: 1400px) {
      height: 120px;

  }
`
const ItemAI = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;  
  gap: 24px 40px;
  margin-top: 32px;
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
const ItemActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media(max-width: 1600px) {
    margin-top: 32px;
  } 
`
const ItemActionsAdd = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  @media(max-width: 480px) {
    gap: 16px;
  }
  img {
    cursor: pointer;
  }
`
const Buttons = styled.div`
  display: flex;
  gap: 16px;
  @media(max-width: 1600px) {
    position: absolute;
    bottom: -72px;
    right: 0;
  } 
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
`;
const DeleteButton = styled(BaseButton)`
  border: 2px solid #2D3241;

  &:hover {
    border: none;
    background-color: rgba(239, 98, 132, 0.08);
  }
`
const GeneratorPreview = styled.div`
  padding-bottom: 30px;
  grid-column: 4 / span 2;
  grid-row: 1 / span 2;

  @media(max-width: 1400px) {
    grid-column: 1 /span 5;
    grid-row: 2;
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
  @media(max-width: 1400px) {
    display: block;
  }
`
const PreviewButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 55px;
`;
const ButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  p {
    color: #6A7080;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
  }
`;
const PreviewButton = styled(BaseButton)`
  border: 2px solid #2D3241;
`;
const PreviewPublish = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 24px;
  font-weight: 800;
  button {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    width: 100%;
    text-align: center;
  }
`
const PreviewSelect = styled.div`
  margin-top: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const PreviewHeadButton = styled.div`
  @media(max-width: 480px) {
    display: none;
  }
`
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
const AddPost = styled.div`
  display: none;
  margin-top: 32px;
  align-items: center;
  justify-content: center;
  
  @media(max-width: 768px) {
    display: flex;
  }
`

export default AiGenerator;