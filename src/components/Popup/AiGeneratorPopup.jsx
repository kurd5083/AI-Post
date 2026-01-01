import { useEffect, useState } from "react";
import styled from "styled-components";
import create from "@/assets/create.svg";
import BtnBase from "@/shared/BtnBase";
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
  const [posts, setPosts] = useState([
    { id: 1, placeholder: "Пост 1", title: "", progress: "0 / 1024", text: "" },
  ]);

  const [selectedPost, setSelectedPost] = useState(posts[0]);
  const [collapsed, setCollapsed] = useState(false);

  const { fadeVisible, ref } = useFadeOnScroll(20);

  const handleAddPost = () => {
    const newPost = {
      id: Date.now(),
      placeholder: `Новый пост ${posts.length + 1}`,
      title: "",
      progress: "0 / 1024",
      text: "",
    };
    setPosts([newPost, ...posts]);
  };

  const handleTitleChange = (id, newTitle) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, title: newTitle } : p))
    );
    if (selectedPost.id === id) {
      setSelectedPost((prev) => ({ ...prev, title: newTitle }));
    }
  };

  const handleTextChange = (id, newText) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, text: newText } : p))
    );
    if (selectedPost.id === id) {
      setSelectedPost((prev) => ({ ...prev, text: newText }));
    }
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
                <HeadTitle
                  tape="text"
                  placeholder={post.placeholder}
                  value={post.title}
                  onChange={(e) => handleTitleChange(post.id, e.target.value)}
                />
              </CheckboxCircle>
              <p>{post.progress}</p>
            </ItemHead>
            <ItemText
              placeholder="Текст публикации..."
              type="text"
              value={post.text}
              onChange={(e) => handleTextChange(post.id, e.target.value)}
            />
           
            <ItemActions>
              <ActionsLeft>
                <ItemAI>
              <p><img src={create} alt="create icon" />Создать фото с AI</p>
              <p><AiGeneratorIcon color="#336CFF"/>Написать с AI</p>
            </ItemAI>
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
              </ActionsLeft>
               
              <ButtonsAll>
                <HideButton onClick={() => setSelectedPost(post)}>
                  <img src={hide} alt="hide icon" width={24} height={17} />
                </HideButton>
                <ButtonsMain>
                  <ButtonsMainTop>
                    <BtnBase $padding="21px 24px" $color="#EF6284" $bg="#241E2D">Отменить</BtnBase>
                    <BtnBase $padding="21px 24px" $border $bg="transporent" $color="#6A7080">Изменить время</BtnBase>
                    <BtnBase $padding="21px 24px" $color="#336CFF" $bg="#161F37">Сохранить</BtnBase>
                  </ButtonsMainTop>
                  <BtnBase $padding="21px 24px" $border $width="100%" $bg="transporent" $color="#6A7080">Опубликовать сейчас</BtnBase>
                </ButtonsMain>
              </ButtonsAll>
            </ItemActions>
          </ListItem>
        ))}
      </GeneratorList>
      <PreviewContainer>
        <Preview collapsed={collapsed} testResult={selectedPost}/>
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
  color: #D6DCEC;
  background: transparent;
  border: none;
`
const ItemText = styled.textarea`
  font-size: 16px;
  font-weight: 700;
  color: #6A7080;
  margin-top: 24px;
  background: transparent;
  border: none;
  outline: none;
  resize: none;

  @media(max-width: 1400px) {
      height: 120px;
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
const ActionsLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
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
const ButtonsAll = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end
  /* @media(max-width: 1600px) {
    position: absolute;
    bottom: -72px;
    right: 0;
  }  */
`;
const ButtonsMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const ButtonsMainTop = styled.div`
  display: flex;
  gap: 8px;
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
const PreviewContainer  = styled.div`
  grid-column:  4 / span 2;
  grid-row: 1 / span 2;
  @media(max-width: 1400px) {
    grid-column: 1 /span 5;
    grid-row: 2;
  }
`;

export default AiGeneratorPopup;