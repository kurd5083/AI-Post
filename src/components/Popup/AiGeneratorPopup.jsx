import { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
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
import AiGeneratorIcon from "@/icons/AiGeneratorIcon";
import Preview from "@/components/Preview";
import CustomSelectThree from "@/shared/CustomSelectThree";

import { useCreatePost } from "@/lib/posts/useCreatePost";
import { usePopupStore } from "@/store/popupStore";
import { formatText } from "@/lib/formatText";
import { useLightboxStore } from "@/store/lightboxStore";
import { useUser } from "@/lib/useUser";
import { usePostsStore } from "@/store/postsStore";
import { useSendPostToChannel } from "@/lib/posts/useSendPostToChannel";
import { useUpdatePost } from "@/lib/posts/useUpdatePost";
import { useDeletePostImage } from "@/lib/posts/useDeletePostImage";
import { useNotificationStore } from "@/store/notificationStore";
import { useUserChannels } from "@/lib/channels/useUserChannels";
import { useAddPostImages } from "@/lib/posts/useAddPostImages";
import normalizeUrl from "@/lib/normalizeUrl";

const AiGeneratorPopup = () => {
  const { addNotification } = useNotificationStore();
  const { openLightbox } = useLightboxStore();
  const { user } = useUser();
  const { popup, changeContent } = usePopupStore();
  const { userChannels } = useUserChannels();
  const {
    posts,
    selectedPost,
    setSelectedPost,
    addPost,
    removePost,
    updatePost,
    addImages,
    removeImage,
    postProgress,
    imageProgress,
    getPostChannel,
    generatePostWithAI,
    generateImageWithAI
  } = usePostsStore();
  const channelId = popup?.data?.channelId;
  const telegramId = user?.telegramId;

  const lastPostText = useRef("");
  const caretRanges = useRef({});
  const textRefs = useRef({});
  const postIntervals = useRef({});
  const imageIntervals = useRef({});

  const [collapsed, setCollapsed] = useState(false);
  const [emojiPostId, setEmojiPostId] = useState(null);

  const { mutate: createPostMutation, isPending: createPostPending } = useCreatePost();
  const { mutate: sendPost, isPending: isSendPending } = useSendPostToChannel();
  const { mutate: updatePostMutation, isPending: updatePending } = useUpdatePost();
  const { mutate: deleteImageFromServer } = useDeletePostImage();
  const { mutate: addImagesToPost } = useAddPostImages();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1400) setCollapsed(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handleAddImages = (postId, files) => {
    const post = posts.find(p => p.postId === postId);
    if (!post) return;

    const fileArray = Array.from(files);
    addImages(postId, fileArray);

    if (post.serverId) {
      addImagesToPost({ postId: post.serverId, images: fileArray }, {
        onSuccess: () => addNotification("Изображения успешно загружены на сервер", "success"),
        onError: () => addNotification("Ошибка загрузки изображений на сервер", "error"),
      });
    }
  };

  const handleSavePost = (post) => {
    console.log(post)
    if (!post.title || !post.summary) {
      addNotification("Пост должен иметь заголовок и текст", "info");
      return;
    }

    const postChannelId = post.serverId
      ? popup?.data?.channelId
      : usePostsStore.getState().channelMap[post.postId] || (userChannels.length ? userChannels[0].id : null);
    const [hoursStr, minutesStr] = post.time?.time?.split(":") || ["00", "00"];
    const hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);
    const baseDate = post.time?.date ? new Date(post.time.date) : new Date();

    baseDate.setUTCHours(hours);
    baseDate.setUTCMinutes(minutes);
    baseDate.setUTCSeconds(0);
    baseDate.setUTCMilliseconds(0);

    const calendarScheduledAt = baseDate.toISOString();
    console.log(calendarScheduledAt, "tesese");
    const basePayload = {
      title: post.title,
      text: post.text,
      channelId: postChannelId,
      publishedAt: new Date().toISOString(),
      calendarScheduledAt,
      summary: post.summary,
    };

    if (!post.serverId) {
      createPostMutation({ ...basePayload, ...post.images.filter(img => typeof img === "string") }, {
        onSuccess: (createdPost) => {
          const serverPostId = createdPost.id;
          const localFiles = post.images.filter(img => img instanceof File);
          if (localFiles.length > 0) {
            addImagesToPost(
              { postId: serverPostId, images: localFiles },
              {
                onSuccess: () => addNotification("Изображения успешно загружены на сервер", "success"),
                onError: () => addNotification("Ошибка загрузки изображений на сервер", "error"),
              }
            );
          }
          removePost(post.postId);
          addNotification("Пост успешно сохранен", "success");
        },
        onError: () => addNotification("Ошибка сохранения поста", "error"),
      });
    } else {
      updatePostMutation({ postId: post.serverId, postData: basePayload }, {
        onSuccess: () => {
          removePost(post.postId);
          addNotification("Пост успешно обновлен", "update");
        },
        onError: () => addNotification("Ошибка обновления поста", "error"),
      });
    }
  };

  const addLink = () => {
    const url = prompt("Введите ссылку");
    if (url) document.execCommand("createLink", false, url);
  };

  const insertEmojiAtCursor = (emoji, postId) => {
    const el = textRefs.current[postId];
    if (!el) return;

    el.focus();

    let selection = document.getSelection();
    let range = caretRanges.current[postId] || (selection?.rangeCount ? selection.getRangeAt(0) : null);

    if (!range || !el.contains(range.startContainer)) {
      const endRange = document.createRange();
      endRange.selectNodeContents(el);
      endRange.collapse(false);
      range = endRange;
    }

    range.deleteContents();
    const node = document.createTextNode(emoji);
    range.insertNode(node);
    range.setStartAfter(node);
    range.collapse(true);

    selection = document.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    caretRanges.current[postId] = range.cloneRange();

    updatePost(postId, { text: el.innerHTML, summary: el.innerHTML });
  };
  const handlePublishNow = (post) => {
    if (!post.summary) return addNotification("Нельзя публиковать пустой пост", "info");

    const postChannelId = channelId || usePostsStore.getState().channelMap[post.postId];
    if (!postChannelId) return addNotification("Выберите канал для публикации поста", "info");

    const publish = (serverPostId) => {
      sendPost(
        { postId: serverPostId, channelId: postChannelId, channelTelegramId: telegramId },
        {
          onSuccess: () => {
            removePost(post.postId);
            addNotification("Пост успешно опубликован", "success");
          },
          onError: () => addNotification("Ошибка публикации поста", "error"),
        }
      );
    };
    if (!post.serverId) {
      const urlImages = post.images.filter(img => typeof img === "string");
      const localFiles = post.images.filter(img => img instanceof File);

      const payload = {
        title: post.title,
        text: post.text,
        images: urlImages,
        channelId: postChannelId,
        publishedAt: new Date().toISOString(),
        summary: post.summary
      };

      createPostMutation(payload, {
        onSuccess: (createdPost) => {
          const serverPostId = createdPost.id;

          if (localFiles.length > 0) {
            addImagesToPost(
              { postId: serverPostId, images: localFiles },
              {
                onSuccess: () => publish(serverPostId),
                onError: () => addNotification("Ошибка загрузки изображений на сервер", "error"),
              }
            );
          } else {
            publish(serverPostId);
          }
        },
        onError: () => addNotification("Ошибка публикации поста", "error"),
      });

      return;
    }

    publish(post.serverId);
  };

  const handleRemoveImage = (postId, index) => {
    removeImage(postId, index);
    addNotification("Изображение удалено", "delete");
    const post = posts.find(p => p.postId === postId);
    if (post?.serverId) deleteImageFromServer({ postId: post.serverId, imageIndex: index });
  };

  const handleRemovePost = (postId) => {
    if (postIntervals.current[postId]) { clearInterval(postIntervals.current[postId]); delete postIntervals.current[postId]; }
    if (imageIntervals.current[postId]) { clearInterval(imageIntervals.current[postId]); delete imageIntervals.current[postId]; }
    removePost(postId);
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

      <GeneratorList>
        {posts.map(post => (
          <ListItem key={post.postId}>
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
                    options={userChannels?.map(c => ({ id: c.id, label: c.name, avatar: c.avatarUrl }))}
                    value={usePostsStore.getState().channelMap[post.postId]}
                    onChange={(id) => usePostsStore.getState().setPostChannel(post.postId, id)}
                  />
                )}
              </HeadBlock>
              <HeadProgress>{post.progress}</HeadProgress>
            </ItemHead>

            <ItemBody>
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
                  const html = el.innerHTML;

                  lastPostText.current = html;

                  const sel = document.getSelection();
                  if (sel?.rangeCount) caretRanges.current[post.postId] = sel.getRangeAt(0).cloneRange();

                  updatePost(post.postId, { text: html, summary: html });
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
                {console.log(post)}
                {post.time && (
                  <ItemTime>
                    Выбрано: {(() => {
                      const d = new Date(post.time.date || new Date());
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

            <ItemActions>
              <ActionsLeft>
                <ItemAI>
                  <BtnBase $padding="0" $color="#336CFF" $bg="transporent" onClick={() => generatePostWithAI(post.postId, channelId || getPostChannel(post.postId))}>
                    <AiGeneratorIcon color="#336CFF" />
                    {postProgress[post.postId] != null && postProgress[post.postId] < 100 ? `Генерация с AI... ${postProgress[post.postId]}%` : "Написать с AI"}
                  </BtnBase>

                  <BtnBase $padding="0" $color="#FF7F48" $bg="transporent" onClick={() => generateImageWithAI(post.postId, post.summary)}>
                    <img src={create} alt="create icon" />
                    {imageProgress[post.postId] != null && imageProgress[post.postId] < 100 ? `Генерация фото с AI... ${imageProgress[post.postId]}%` : "Создать фото с AI"}
                  </BtnBase>
                </ItemAI>

                <ItemActionsAdd>
                  <input type="file" accept="image/*" multiple style={{ display: "none" }} id={`file-input-${post.postId}`} onChange={e => { if (e.target.files?.length) handleAddImages(post.postId, e.target.files); }} />
                  <img src={paper} alt="paper icon" title="Добавить изображение" onClick={() => document.getElementById(`file-input-${post.postId}`).click()} />
                  <div style={{ position: "relative" }}>
                    <img src={smiley} title="Добавить эмодзи" onClick={() => setEmojiPostId(prev => prev === post.postId ? null : post.postId)} />
                    {emojiPostId === post.postId && (
                      <div style={{ position: "absolute", zIndex: 100 }}>
                        <EmojiPicker onEmojiClick={emojiData => { insertEmojiAtCursor(emojiData.emoji, post.postId); setEmojiPostId(null); }} theme="dark" locale="ru" />
                      </div>
                    )}
                  </div>
                  <img src={fat} alt="fat icon" title="Жирный" onClick={() => formatText("bold")} />
                  <img src={italics} alt="italics icon" title="Курсив" onClick={() => formatText("italic")} />
                  <img src={underlined} alt="underlined icon" title="Подчёркнутый" onClick={() => formatText("underline")} />
                  <img src={crossed} alt="crossed icon" title="Зачёркнутый" onClick={() => formatText("strikeThrough")} />
                  <img src={link} alt="link icon" title="Добавить ссылку" onClick={() => addLink(post.postId)} />
                  <img src={hide} alt="hide icon" title="Посмотреть лайв превью" width={24} height={17} onClick={() => setSelectedPost(post)} />
                </ItemActionsAdd>
              </ActionsLeft>

              <ButtonsAll>
                <ButtonsMainTop>
                  <BtnBase $padding="21px 19px" $color="#EF6284" $bg="#241E2D" onClick={() => handleRemovePost(post.postId)}>Отменить</BtnBase>
                  <BtnBase $padding="21px 20px" $border $bg="transporent" $color="#6A7080" onClick={() => changeContent("change_time_popup", "popup_window", { postId: post.postId })}>Изменить время</BtnBase>
                  <BtnBase $padding="21px 20px" $color="#336CFF" $bg="#161F37" onClick={() => handleSavePost(post)} disabled={updatePending || createPostPending}>{createPostPending ? "Сохраняем..." : "Сохранить"}</BtnBase>
                </ButtonsMainTop>
                <BtnBase $padding="21px 18px" $border $width="100%" $bg="transporent" $color="#6A7080" onClick={() => handlePublishNow(post)} disabled={isSendPending}>{isSendPending ? "Публикация..." : "Опубликовать сейчас"}</BtnBase>
              </ButtonsAll>
            </ItemActions>
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
  max-height: calc(100dvh - 285px);
  min-height: 600px;
  height: 100%;
  
  @media(max-width: 2000px) {
    gap: 220px;
  } 
  @media(max-width: 1800px) {
    grid-column: 1 /span 5;
    grid-row: 3;
  }
  @media(max-width: 480px) {
    gap: 290px;
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
  min-width: 40%;
  width: 100%;
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
  color: #6a7080;
  text-align: right;
  flex-grow: 0;
`;
const ItemActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
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
    cursor: pointer;
  }
`
const ItemActionsAdd = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px 32px;
  @media(max-width: 480px) {
    gap: 24px;
  }
  img {
    cursor: pointer;
  }
`
const ButtonsAll = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
  align-items: flex-end;
  justify-content: flex-end;
  flex-wrap: wrap;

  @media(max-width: 2000px) {
    flex-direction: column;
    position: absolute;
    bottom: -150px;
    right: 0;
  } 
  @media(max-width: 480px) {
    bottom: -220px;
  } 
`;
const ButtonsMainTop = styled.div`
  display: flex;
  gap: 8px;

  @media(max-width: 480px) {
    flex-wrap: wrap;
    button {
      flex: auto;
    }
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
const PreviewContainer = styled.div`
  grid-column:  4 / span 2;
  grid-row: 1 / span 2;
  @media(max-width: 1800px) {
    grid-column: 1 /span 5;
    grid-row: 2;
  }
`;

export default AiGeneratorPopup;