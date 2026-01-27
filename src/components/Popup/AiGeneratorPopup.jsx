import { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";

import BtnBase from "@/shared/BtnBase";
import CustomSelectThree from "@/shared/CustomSelectThree";

import AiGeneratorIcon from "@/icons/AiGeneratorIcon";
import Preview from "@/components/Preview";
import ActionsPost from "@/components/Popup/AiGenerator/ActionsPost";

import { useUser } from "@/lib/user/useUser";
import { useDeletePostImage } from "@/lib/posts/useDeletePostImage";
import { useUserChannels } from "@/lib/channels/useUserChannels";
import normalizeUrl from "@/lib/normalizeUrl";

import { useNotificationStore } from "@/store/notificationStore";
import { usePostsStore } from "@/store/postsStore";
import { usePopupStore } from "@/store/popupStore";
import { useLightboxStore } from "@/store/lightboxStore";

const AiGeneratorPopup = () => {
  const { addNotification } = useNotificationStore();
  const { openLightbox } = useLightboxStore();
  const { user } = useUser();
  const { popup } = usePopupStore();
  const { userChannels } = useUserChannels();
  const {
    posts,
    selectedPost,
    addPost,
    updatePost,
    removeImage,
  } = usePostsStore();
  
  const channelId = popup?.data?.channelId;
  const telegramId = user?.telegramId;

  const caretRanges = useRef({});
  const textRefs = useRef({});

  const [collapsed, setCollapsed] = useState(false);

  const { mutate: deleteImageFromServer } = useDeletePostImage();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1400) setCollapsed(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRemoveImage = (postId, index) => {
    removeImage(postId, index);
    addNotification("Изображение удалено", "delete");
    const post = posts.find(p => p.postId === postId);
    if (post?.serverId) deleteImageFromServer({ postId: post.serverId, imageIndex: index });
  };

  return (
    <GeneratorContainer>
      <GeneratorHead>
        <h2>
          <AiGeneratorIcon width={16} height={16} color="#336CFF" />
          Создать пост
        </h2>
        <BtnBase $padding="21px 24px" onClick={() => addPost()}>+ Добавить пост</BtnBase>
      </GeneratorHead>
      <AddPostButton>
        <BtnBase $padding="21px 24px" onClick={() => addPost()}>+ Добавить пост</BtnBase>
      </AddPostButton>
      <GeneratorList>
        {posts.map((post, index) => (
          <ListItem key={post.postId} style={{ zIndex: 1000 - index }}>
            <ItemHead>
              <HeadBlock>
                <HeadTitle
                  tape="text"
                  placeholder={post.placeholder}
                  value={post.title}
                  onChange={e => updatePost(post.postId, { title: e.target.value })}
                />
                {!channelId && (
                  <CustomSelectThree
                    options={userChannels?.map(c => ({
                      id: c.id,
                      label: c.name,
                      icon: c.name,
                    }))}
                    value={usePostsStore.getState().channelMap[post.postId]}
                    onChange={(id) => usePostsStore.getState().setPostChannel(post.postId, id)}
                    background="#222b43f6"
                  />
                )}
              </HeadBlock>
              <HeadProgress>{post.progress}</HeadProgress>
            </ItemHead>

            <ItemBody>
              <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <ItemText
                  contentEditable
                  suppressContentEditableWarning
                  ref={el => {
                    if (!el) return;
                    textRefs.current[post.postId] = el;

                    if (el.innerHTML !== post.summary) {
                      el.innerHTML = post.summary;
                    }
                  }}
                  onInput={e => {
                    const el = e.currentTarget;
                    const summaryHtml = el.innerHTML;
                    const plainText = el.innerText;
                    const sel = document.getSelection();
                    if (sel?.rangeCount) {
                      caretRanges.current[post.postId] = sel.getRangeAt(0).cloneRange();
                    }
                    updatePost(post.postId, {
                      summary: summaryHtml,
                      text: plainText
                    });
                  }}

                  onClick={() => {
                    const sel = document.getSelection();
                    if (sel?.rangeCount) caretRanges.current[post.postId] = sel.getRangeAt(0).cloneRange();
                  }}
                  onKeyUp={() => {
                    const sel = document.getSelection();
                    if (sel?.rangeCount) caretRanges.current[post.postId] = sel.getRangeAt(0).cloneRange();
                  }}
                />

                {post.url && (
                  <UrlText>
                    🔗
                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                      Источник
                    </a>
                  </UrlText>
                )}
              </div>
              <BodyRight>
                <ImagesContainer>
                  {(post.images || []).map((img, index) => {
                    const src = normalizeUrl(img);
                    return (
                      <ImagePreview key={index}>
                        <img
                          src={src}
                          alt={`preview-${index}`}
                          onClick={() =>
                            openLightbox({
                              images: post.images.map(i => i instanceof File ? URL.createObjectURL(i) : normalizeUrl(i)),
                              initialIndex: index
                            })
                          }
                        />
                        <RemoveImageButton onClick={() => handleRemoveImage(post.postId, index, post.serverId)}>×</RemoveImageButton>
                      </ImagePreview>
                    );
                  })}
                </ImagesContainer>
                {post.time && post.time.date && (
                  <ItemTime>
                    Выбрано: {(() => {
                      const d = new Date(post.time.date);
                      return d.toLocaleString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "UTC",
                      });
                    })()}
                  </ItemTime>
                )}
              </BodyRight>
            </ItemBody>
            <ActionsPost post={post} textRefs={textRefs} caretRanges={caretRanges} channelId={channelId} telegramId={telegramId}/>
          </ListItem>
        ))}
      </GeneratorList>
      <PreviewContainer>
        <Preview collapsed={collapsed} onChange={() => setCollapsed(!collapsed)} testResult={selectedPost} />
      </PreviewContainer>
    </GeneratorContainer>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scaleUp = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const GeneratorContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 124px auto;
  align-items: start;
  gap: 16px;
  padding: 0 56px;
  margin-top: 24px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
    grid-template-rows: 93px auto;
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
  @media(max-width: 1800px) {
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
const AddPostButton = styled.div`
  display: none;
  @media(max-width: 768px) {
    display: flex;
    justify-content: center;
    grid-column:  1 / span 5;
    grid-row: 3;
  }
`;

const GeneratorList = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  grid-column:  1 / span 3;
  grid-row: 2;
  overflow-y: auto;
  scrollbar-width: none;
  max-height: calc(100dvh - 285px);
  min-height: calc(100dvh - 285px);
  height: 100%;

  @media(max-width: 2000px) {
    gap: 160px;
  } 
  @media(max-width: 1800px) {
    grid-column: 1 /span 5;
    grid-row: 3;
  }
  @media(max-width: 1400px) {
    min-height: 650px;
  }
  @media(max-width: 768px) {
    grid-row: 4;
  }
  @media(max-width: 480px) {
    gap: 240px;
  } 
`;
const ListItem = styled.div`
  position: relative;
  padding: 32px;
  border-radius: 24px;
  border: 2px solid #252D43;
  animation: ${fadeIn} 0.3s ease forwards;

  @media(max-width: 480px) {
    padding: 16px;
  } 
`
const ItemHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
`
const HeadBlock = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 12px;
  width: calc(100% - 100px);
`
const HeadProgress = styled.p`
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 600;
`
const HeadTitle = styled.input`
  font-size: 24px;
  font-weight: 700;
  color: #D6DCEC;
  background: transparent;
  border: none;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:focus {
    outline: none;
  }
`
const ItemBody = styled.div`
  display: flex;
  flex-direction: column;
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
  scrollbar-width: none;
  white-space: pre-wrap;
  word-break: break-word;
  min-width: 40%;

  &[contenteditable="true"]:empty:before {
    content: "Текст публикации...";
    color: #6A7080;
    opacity: 0.6;
  }
  a {
    color: #0048ff;
    text-decoration: underline;
    font-weight: 600;
    cursor: pointer;
  }

  a:hover {
    text-decoration: none;
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
  gap: 8px;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  animation: ${scaleUp} 0.3s ease forwards;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    }
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
  font-weight: 600;
  color: #6a7080;
  flex-grow: 0;
`;
const PreviewContainer = styled.div`
  padding-bottom: 30px;
  grid-column:  4 / span 2;
  grid-row: 1 / span 2;
  @media(max-width: 1800px) {
    grid-column: 1 /span 5;
    grid-row: 2;
  }
`;
const UrlText = styled.div`
  font-size: 14px;
  color: #0048ff;
  margin-top: 14px;

  a {
    text-decoration: underline;
    font-weight: 700;
    cursor: pointer;
  }
  a:hover {
    text-decoration: none;
  }
`;

export default AiGeneratorPopup;