import { useEffect, useState } from "react";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";

import create from "@/assets/create.svg";
import hide from "@/assets/hide.svg";
import paper from "@/assets/ai-generator/paper.svg";
import smiley from "@/assets/ai-generator/smiley.svg";
import fat from "@/assets/ai-generator/fat.svg";
import italics from "@/assets/ai-generator/italics.svg";
import underlined from "@/assets/ai-generator/underlined.svg";
import crossed from "@/assets/ai-generator/crossed.svg";
import link from "@/assets/ai-generator/link.svg";

import BtnBase from "@/shared/BtnBase";
// import CheckboxCircle from "@/shared/CheckboxCircle";
import AiGeneratorIcon from "@/icons/AiGeneratorIcon";
import useFadeOnScroll from "@/lib/useFadeOnScroll";
import Preview from "@/components/Preview";
import ChangeTimePopup from "@/components/PopupWindow/ChangeTimePopup";
import { useCreatePost } from "@/lib/posts/useCreatePost";
import { usePopupStore } from "@/store/popupStore";
import { formatText } from "@/lib/formatText";
import { useLightboxStore } from "@/store/lightboxStore";

const AiGeneratorPopup = () => {
  const generatePostId = () => Math.floor(Math.random() * 2_000_000_000);

  const { openLightbox } = useLightboxStore();

  const { popup } = usePopupStore();
  const channelId = popup?.data?.channelId;
  const telegramId = popup?.data?.telegramId;

  const [posts, setPosts] = useState([
    { postId: generatePostId(), placeholder: "Пост 1", title: "", progress: "0 / 1024", text: "", summary: "", time: "00:00" },
  ]);
  const [selectedPost, setSelectedPost] = useState(posts[0]);
  const [collapsed, setCollapsed] = useState(false);
  const [popupPostId, setPopupPostId] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectionRange, setSelectionRange] = useState(null);
  const [activePostId, setActivePostId] = useState(null);

  const { fadeVisible, ref } = useFadeOnScroll(20);
  const { mutate: createPostMutation } = useCreatePost();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1400) setCollapsed(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddPost = () => {
    const newPost = {
      postId: generatePostId(),
      placeholder: `Новый пост ${posts.length + 1}`,
      title: "",
      progress: "0 / 1024",
      text: "",
      summary: "",
      time: "00:00",
    };
    setPosts([newPost, ...posts]);
  };

  const handleRemovePost = (postId) => {
    setPosts(prev => prev.filter(p => p.postId !== postId));
    if (selectedPost?.postId === postId) {
      setSelectedPost(posts.find(p => p.postId !== postId) || null);
    }
  };

  const handleTitleChange = (postId, newTitle) => {
    setPosts(prev => prev.map(p => p.postId === postId ? { ...p, title: newTitle } : p));
  };

  const handleTextChange = (postId, newText) => {
    setPosts(prev => prev.map(p =>
      p.postId === postId ? { ...p, text: newText, summary: newText.slice(0, 150) } : p
    ));
  };

  const handleSaveTime = (newTime) => {
    setPosts(prev => prev.map(p => p.postId === popupPostId ? { ...p, time: newTime } : p));
    setPopupPostId(null);
  };

  const handleSavePost = (post) => {
    const [hours, minutes] = post.time.split(":").map(Number);

    const calendarScheduledAt = new Date(
      Date.UTC(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        hours || 0,
        minutes || 0,
        0
      )
    ).toISOString();

    const payload = {
      title: post.title,
      text: post.text,
      images: [],
      source: "",
      channelId,
      publishedAt: new Date().toISOString(),
      calendarScheduledAt,
      summary: post.summary,
    };

    createPostMutation(payload);
  };

  const addLink = () => {
    const url = prompt("Введите ссылку");
    if (url) document.execCommand("createLink", false, url);
  };

  const saveSelection = (postId) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setSelectionRange(selection.getRangeAt(0));
      setActivePostId(postId);
    }
  };

  const insertEmojiAtCursor = (emoji, postId) => {
    const el = document.getElementById(`text-${postId}`);
    el.focus();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();

    const textNode = document.createTextNode(emoji);
    range.insertNode(textNode);

    range.setStartAfter(textNode);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);

    setPosts(prev =>
      prev.map(p =>
        p.postId === postId ? { ...p, text: el.innerHTML } : p
      )
    );
  };
  const handleAddImage = (postId, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      setPosts(prev =>
        prev.map(p =>
          p.postId === postId
            ? { ...p, images: [...(p.images || []), imageUrl] }
            : p
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (postId, index) => {
    setPosts(prev =>
      prev.map(p =>
        p.postId === postId
          ? { ...p, images: p.images.filter((_, i) => i !== index) }
          : p
      )
    );
  };
  return (
    <GeneratorContainer>
      <GeneratorHead>
        <h2>
          <AiGeneratorIcon width={16} height={16} color="#336CFF" />
          Создать пост
        </h2>
        <BtnBase $padding="21px 24px" onClick={handleAddPost}>
          + Добавить пост
        </BtnBase>
      </GeneratorHead>

      <GeneratorList $fadeVisible={fadeVisible} ref={ref}>
        {posts.map(post => (
          <ListItem key={post.postId}>
            <ItemHead>
              {/* <CheckboxCircle></CheckboxCircle> */}
              <HeadTitle
                  tape="text"
                  placeholder={post.placeholder}
                  value={post.title}
                  onChange={e => handleTitleChange(post.postId, e.target.value)}
                />
              <p>{post.progress}</p>
            </ItemHead>

            <ItemBody>
              <ItemText
                contentEditable
                suppressContentEditableWarning
                id={`text-${post.postId}`}
                ref={el => el && el.innerHTML !== post.text && (el.innerHTML = post.text)}
                onInput={e => handleTextChange(post.postId, e.currentTarget.innerHTML)}
                onClick={() => saveSelection(post.postId)}
                onKeyUp={() => saveSelection(post.postId)}
              />
              <BodyRight>
                <ImagesContainer>
                  {(post.images || []).map((img, index) => (
                    <ImagePreview key={index}>
                      <img 
                      src={img} 
                      alt={`preview-${index}`} 
                      onClick={() => openLightbox({
                        images: post.images.map(img => img),
                        initialIndex: 0
                      })}
                      />
                      <RemoveImageButton onClick={() => handleRemoveImage(post.postId, index)}>×</RemoveImageButton>
                    </ImagePreview>
                  ))}
                </ImagesContainer>
                <ItemTime>Время публикации: {post.time}</ItemTime>
              </BodyRight>
            </ItemBody>

            <ItemActions>
              <ActionsLeft>
                <ItemAI>
                  <p><AiGeneratorIcon color="#336CFF" />Написать с AI</p>
                  <p><img src={create} alt="create icon" />Создать фото с AI</p>
                </ItemAI>

                <ItemActionsAdd>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id={`file-input-${post.postId}`}
                    onChange={e => {
                      if (e.target.files[0]) handleAddImage(post.postId, e.target.files[0]);
                      e.target.value = "";
                    }}
                  />

                  <img
                    src={paper}
                    alt="paper icon"
                    style={{ cursor: "pointer" }}
                    onClick={() => document.getElementById(`file-input-${post.postId}`).click()}
                  />

                  <div style={{ position: "relative" }}>
                    <img
                      src={smiley}
                      alt="emoji"
                      onClick={() => setShowEmoji(p => !p)}
                    />
                    {showEmoji && (
                      <div style={{ position: "absolute", zIndex: 100 }}>
                        <EmojiPicker
                          onEmojiClick={emojiData => {
                            insertEmojiAtCursor(emojiData.emoji, post.postId);
                            setShowEmoji(false);
                          }}
                          theme="dark"
                          locale="ru"
                        />
                      </div>
                    )}
                  </div>

                  <img src={fat} alt="fat icon" onClick={() => formatText("bold")} />
                  <img src={italics} alt="italics icon" onClick={() => formatText("italic")} />
                  <img src={underlined} alt="underlined icon" onClick={() => formatText("underline")} />
                  <img src={crossed} alt="crossed icon" onClick={() => formatText("strikeThrough")} />
                  <img src={link} alt="link icon" onClick={() => addLink(post.postId)} />
                </ItemActionsAdd>
              </ActionsLeft>

              <ButtonsAll>
                <HideButton onClick={() => setSelectedPost(post)}>
                  <img src={hide} alt="hide icon" width={24} height={17} />
                </HideButton>

                <ButtonsMain>
                  <ButtonsMainTop>
                    <BtnBase $padding="21px 24px" $color="#EF6284" $bg="#241E2D" onClick={() => handleRemovePost(post.postId)}>
                      Отменить
                    </BtnBase>
                    <BtnBase $padding="21px 24px" $border $bg="transporent" $color="#6A7080" onClick={() => setPopupPostId(post.postId)}>
                      Изменить время
                    </BtnBase>
                    <BtnBase $padding="21px 24px" $color="#336CFF" $bg="#161F37" onClick={() => handleSavePost(post)}>
                      Сохранить
                    </BtnBase>
                  </ButtonsMainTop>
                  <BtnBase $padding="21px 24px" $border $width="100%" $bg="transporent" $color="#6A7080">
                    Опубликовать сейчас
                  </BtnBase>
                </ButtonsMain>
              </ButtonsAll>
            </ItemActions>
          </ListItem>
        ))}
      </GeneratorList>

      <PreviewContainer>
        <Preview collapsed={collapsed} onChange={() => setCollapsed(!collapsed)} testResult={selectedPost} telegramId={telegramId} />
      </PreviewContainer>

      {popupPostId && (
        <ChangeTimePopup
          onSave={handleSaveTime}
          onClose={() => setPopupPostId(null)}
          initialTime={posts.find(p => p.postId === popupPostId)?.time || "00:00"}
        />
      )}
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
const ItemBody = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: flex-start;
  margin: 24px 0;
`
const ItemText = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #6A7080;
  background: transparent;
  width: 100%;
  border: none;
  outline: none;
  min-height: 80px;
  max-height: 300px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-word;

  &[contenteditable="true"]:empty:before {
    content: "Текст публикации...";
    color: #6A7080;
    opacity: 0.6;
  }

  @media (max-width: 1400px) {
    min-height: 120px;
  }
`;

const BodyRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
const ImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 48px;
  height: 48px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;
const RemoveImageButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -6px;
  right: -6px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: red;
  color: white;
  font-size: 18px;
  font-weight: 600;
`;
const ItemTime = styled.p`
  font-size: 14px;
  color: #6a7080;
  text-align: right;
`;
const ItemActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`
const ActionsLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin-bottom: 20px;
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
      color: #336CFF;

    }
    &:last-child {
      color: #FF7F48;
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
  align-items: flex-end;
  @media(max-width: 1600px) {
    position: absolute;
    bottom: -72px;
    right: 0;
  } 
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
const PreviewContainer = styled.div`
  grid-column:  4 / span 2;
  grid-row: 1 / span 2;
  @media(max-width: 1400px) {
    grid-column: 1 /span 5;
    grid-row: 2;
  }
`;

export default AiGeneratorPopup;