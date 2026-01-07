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
import { useGenerateSimpleImage } from "@/lib/channels/image-generation/useGenerateSimpleImage";
import { useGeneratePost } from "@/lib/posts/useGeneratePost";
import { usePostsStore } from "@/store/postsStore";
import { useSendPostToChannel } from "@/lib/posts/useSendPostToChannel";
import { useUpdatePost } from "@/lib/posts/useUpdatePost";
import { useDeletePostImage } from "@/lib/posts/useDeletePostImage";
import { useNotificationStore } from "@/store/notificationStore";
import { useUserChannels } from "@/lib/channels/useUserChannels";
import { useAddPostImages } from "@/lib/posts/useAddPostImages";

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
    setPostProgress,
    setImageProgress,
    resetPostProgress,
    resetImageProgress
  } = usePostsStore();

  const channelId = popup?.data?.channelId;
  const telegramId = user?.telegramId;
  const postIntervals = useRef({});
  const imageIntervals = useRef({});

  const [collapsed, setCollapsed] = useState(false);
  const [popupPostId, setPopupPostId] = useState(null);
  const [emojiPostId, setEmojiPostId] = useState(null);

  const { mutate: createPostMutation, isPending: createPostPending } = useCreatePost();
  const { mutate: generateImage, isPending: imagePending } = useGenerateSimpleImage();
  const { mutate: generatePost, isPending: postPending } = useGeneratePost();
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

  const handleWriteWithAI = (postId) => {
    const selectedChannelId = channelId || usePostsStore.getState().getPostChannel(postId);
    if (!selectedChannelId) return addNotification("Выберите канал", "info");

    const post = posts.find(p => p.postId === postId);
    if (!post) return addNotification("Пост не найден", "error");

    setPostProgress(postId, 0);

    postIntervals.current[postId] = setInterval(() => {
      const current = usePostsStore.getState()?.postProgress?.[postId] ?? 0;
      setPostProgress(postId, Math.min(current + Math.floor(Math.random() * 10), 90));
    }, 500);

    generatePost({ channelId: selectedChannelId }, {
      onSuccess: (data) => {
        clearInterval(postIntervals.current[postId]);
        setPostProgress(postId, 100);

        updatePost(postId, {
          title: data.title || "",
          text: data.summary || "",
          summary: data.summary || "",
          images: data.images || []
        });

        setTimeout(() => resetPostProgress(postId), 1000);
        addNotification(data?.message || "Пост сгенерирован успешно", data?.error ? "error" : "success");
      },
      onError: (error) => {
        clearInterval(postIntervals.current[postId]);
        setPostProgress(postId, 0);
        resetPostProgress(postId);

        addNotification(error?.response?.data?.message || "Ошибка генерации поста", "error");
      },
    });
  };

  const handleCreateAIImage = async (postId) => {
    const post = posts.find(p => p.postId === postId);
    if (!post?.text) return addNotification("Для генерации изображения нужен текст", "info");

    setImageProgress(postId, 0);

    imageIntervals.current[postId] = setInterval(() => {
      const current = usePostsStore.getState().imageProgress[postId] ?? 0;
      setImageProgress(postId, Math.min(current + Math.floor(Math.random() * 10), 95));
    }, 500);

    generateImage({ prompt: post.text }, {
      onSuccess: async (data) => {
        clearInterval(imageIntervals.current[postId]);
        if (!data?.imageUrls?.length) {
          addNotification("Не удалось получить изображение", "error");
          clearInterval(imageIntervals.current[postId]);
          return;
        }

        setImageProgress(postId, 100);
        setTimeout(() => resetImageProgress(postId), 1000);
        updatePost(postId, { images: [...(post.images || []), data.imageUrls[0]] });
        addNotification("Изображение успешно сгенерировано", "success");
      },
      onError: () => {
        clearInterval(imageIntervals.current[postId]);
        setImageProgress(postId, 0);
        addNotification("Ошибка генерации изображения", "error");
      },
    });
  };

  const handleSaveTime = (newTime, postId) => updatePost(postId, { time: newTime });

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
    if (!post.title || !post.text) {
      addNotification("Пост должен иметь заголовок и текст", "info");
      return;
    }

    const postChannelId = post.serverId
      ? popup?.data?.channelId
      : usePostsStore.getState().channelMap[post.postId] || (userChannels.length ? userChannels[0].id : null);

    const [hoursStr, minutesStr] = post.time?.split(":") || ["00", "00"];
    const hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);

    const isValidHour = !isNaN(hours) && hours >= 0 && hours <= 23;
    const isValidMinute = !isNaN(minutes) && minutes >= 0 && minutes <= 59;

    const calendarScheduledAt = isValidHour && isValidMinute
      ? new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), hours, minutes)).toISOString()
      : new Date().toISOString();

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

    updatePost(postId, { text: el.innerHTML, summary: el.innerHTML });
  };

  const handlePublishNow = (post) => {
    if (!post.text) return addNotification("Нельзя публиковать пустой пост", "info");

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
              <p>{post.progress}</p>
            </ItemHead>

            <ItemBody>
              <ItemText
                contentEditable
                suppressContentEditableWarning
                id={`text-${post.postId}`}
                ref={el => el && el.innerHTML !== post.summary && (el.innerHTML = post.summary)}
                onInput={e => updatePost(post.postId, { text: e.currentTarget.innerHTML, summary: e.currentTarget.innerHTML })}
              />
              <BodyRight>
                <ImagesContainer>
                  {(post.images || []).map((img, index) => {
                    const src = img instanceof File ? URL.createObjectURL(img) : img;
                    return (
                      <ImagePreview key={index}>
                        <img
                          src={src}
                          alt={`preview-${index}`}
                          onClick={() =>
                            openLightbox({ images: post.images.map(i => i instanceof File ? URL.createObjectURL(i) : i), initialIndex: index })
                          }
                        />
                        <RemoveImageButton onClick={() => handleRemoveImage(post.postId, index, post.serverId)}>×</RemoveImageButton>
                      </ImagePreview>
                    );
                  })}
                </ImagesContainer>
              </BodyRight>
            </ItemBody>

            <ItemActions>
              <ActionsLeft>
                <ItemAI>
                  <BtnBase $padding="0" $color="#336CFF" $bg="transporent" onClick={() => handleWriteWithAI(post.postId)} disabled={postPending}>
                    <AiGeneratorIcon color="#336CFF" />
                    {postProgress[post.postId] != null && postProgress[post.postId] < 100 ? `Генерация с AI... ${postProgress[post.postId]}%` : "Написать с AI"}
                  </BtnBase>

                  <BtnBase $padding="0" $color="#FF7F48" $bg="transporent" onClick={() => handleCreateAIImage(post.postId)} disabled={imagePending}>
                    <img src={create} alt="create icon" />
                    {imageProgress[post.postId] != null && imageProgress[post.postId] < 100 ? `Генерация фото с AI... ${imageProgress[post.postId]}%` : "Создать фото с AI"}
                  </BtnBase>
                </ItemAI>

                <ItemActionsAdd>
                  <input type="file" accept="image/*" multiple style={{ display: "none" }} id={`file-input-${post.postId}`} onChange={e => { if (e.target.files?.length) handleAddImages(post.postId, e.target.files); }} />
                  <img src={paper} alt="paper icon" style={{ cursor: "pointer" }} onClick={() => document.getElementById(`file-input-${post.postId}`).click()} />

                  <div style={{ position: "relative" }}>
                    <img src={smiley} onClick={() => setEmojiPostId(prev => prev === post.postId ? null : post.postId)} />
                    {emojiPostId === post.postId && (
                      <div style={{ position: "absolute", zIndex: 100 }}>
                        <EmojiPicker onEmojiClick={emojiData => { insertEmojiAtCursor(emojiData.emoji, post.postId); setEmojiPostId(null); }} theme="dark" locale="ru" />
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
                <HideButton onClick={() => setSelectedPost(post)}><img src={hide} alt="hide icon" width={24} height={17} /></HideButton>

                <ButtonsMain>
                  <ButtonsMainTop>
                    <BtnBase $padding="21px" $color="#EF6284" $bg="#241E2D" onClick={() => handleRemovePost(post.postId)}>Отменить</BtnBase>
                    <BtnBase $padding="21px" $border $bg="transporent" $color="#6A7080" onClick={() => { setPopupPostId(post.postId); changeContent("change_time_popup", "popup_window", { onSave: (newTime) => handleSaveTime(newTime, post.postId), initialTime: post.time || "00:00" }); }}>Изменить время</BtnBase>
                    <BtnBase $padding="21px" $color="#336CFF" $bg="#161F37" onClick={() => handleSavePost(post)} disabled={updatePending || postPending}>{createPostPending ? "Сохраняем..." : "Сохранить"}</BtnBase>
                  </ButtonsMainTop>
                  <BtnBase $padding="21px" $border $width="100%" $bg="transporent" $color="#6A7080" onClick={() => handlePublishNow(post)} disabled={isSendPending}>{isSendPending ? "Публикация..." : "Опубликовать сейчас"}</BtnBase>
                </ButtonsMain>
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
  
  @media(max-width: 2000px) {
    gap: 220px;
  } 
  @media(max-width: 1400px) {
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
`

const HeadTitle = styled.input`
  font-size: 24px;
  font-weight: 700;
  color: #D6DCEC;
  background: transparent;
  border: none;
  flex: 1;
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
  gap: 8px;
  align-items: flex-end;
  justify-content: flex-end;
  flex-wrap: wrap;

  @media(max-width: 2000px) {
    flex-direction: column;
    position: absolute;
    bottom: -210px;
    right: 0;
  } 
  @media(max-width: 480px) {
    bottom: -280px;
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
  button {
    flex-shrink: 0;
  }
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
const HideButton = styled(BaseButton)`
  border: 2px solid #2D3241;
`;
const PreviewContainer = styled.div`
  grid-column:  4 / span 2;
  grid-row: 1 / span 3;
  @media(max-width: 1400px) {
    grid-column: 1 /span 5;
    grid-row: 2;
  }
`;

export default AiGeneratorPopup;