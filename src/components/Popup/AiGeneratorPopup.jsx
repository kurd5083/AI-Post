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
import CheckboxCircle from "@/shared/CheckboxCircle";
import AiGeneratorIcon from "@/icons/AiGeneratorIcon";
import useFadeOnScroll from "@/lib/useFadeOnScroll";
import Preview from "@/components/Preview";

const AiGeneratorPopup = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Пост 1",
      progress: "0 / 1024",
      text: "",
    },
  ]);

  const { fadeVisible, ref } = useFadeOnScroll(20);

  const handleAddPost = () => {
    const newPost = {
      id: Date.now(),
      title: `Новый пост ${posts.length + 1}`,
      progress: "0 / 1024",
      text: "",
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

  const handleTextChange = (id, newText) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, text: newText } : p))
    );
  };

  return (
    <GeneratorContainer>
      <GeneratorHead>
        <h2>
          <AiGeneratorIcon width={16} height={16} color="#336CFF"/>
          Создать пост
        </h2>
        <BtnBase $padding="21px 24px" onClick={() => handleAddPost()}>
          + Добавить пост
        </BtnBase>
      </GeneratorHead>
      <GeneratorList $fadeVisible={fadeVisible} ref={ref}>
        {posts.map((post) => (
          <ListItem key={post.id}>
            <ItemHead>
              <CheckboxCircle>
                <HeadTitle value={post.title}/>
              </CheckboxCircle>
              <p>{post.progress}</p>
            </ItemHead>
            <ItemText
              placeholder="Текст публикации..."
              type="text"
              value={post.text}
              onChange={(e) => handleTextChange(post.id, e.target.value)}
            />
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
      <PreviewContainer>
        <Preview collapsed={collapsed}/>
      </PreviewContainer>
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
  }

`
const HeadTitle = styled.input`
  font-size: 24px;
  font-weight: 700;
`
const ItemText = styled.input`
  font-size: 16px;
  font-weight: 700;
  color: #6A7080;
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
const PreviewContainer  = styled.div`
  grid-column:  4 / span 2;
  grid-row: 1 / span 2;
  @media(max-width: 1400px) {
    grid-column: 1 /span 5;
    grid-row: 2;
  }
`;

export default AiGeneratorPopup;