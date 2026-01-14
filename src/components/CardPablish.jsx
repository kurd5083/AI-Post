import styled from "styled-components";

import { useLightboxStore } from "@/store/lightboxStore";
import { usePostsStore } from "@/store/postsStore";
import { usePopupStore } from "@/store/popupStore";
import { useNotificationStore } from "@/store/notificationStore";

import normalizeUrl from "@/lib/normalizeUrl";
import { useDeletePost } from "@/lib/posts/useDeletePost";
import { useSendPostToChannel } from "@/lib/posts/useSendPostToChannel";

import AvaPlug from "@/shared/AvaPlug";
import BtnBase from "@/shared/BtnBase";

import EyeIcon from "@/icons/EyeIcon";
import EditIcon from "@/icons/EditIcon";
import DelIcon from "@/icons/DelIcon";
import TimeIcon from "@/icons/TimeIcon";

const MAX_VISIBLE_IMAGES = 3;

const CardPablish = ({ item, bg, selectedChannel }) => {
  const { openLightbox } = useLightboxStore();
  const { addPost } = usePostsStore();
  const { changeContent } = usePopupStore();
  const { addNotification } = useNotificationStore();

  const { mutate: deletePost, isPending: deletePending } = useDeletePost();
  const { mutate: sendPost, isPending: isSendPending } = useSendPostToChannel();

  const handleEdit = () => {
    addPost({
      postId: item.id,
      title: item.title,
      text: item.text || "",
      summary: item.summary || "",
      images: item.images || [],
      time: item.publishedAt
        ? {
          date: item.publishedAt,
          time: new Date(item.publishedAt).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "UTC",
          }),
        }
        : null,
      serverId: item.id,
      placeholder: "Новый пост",
      url: item.url
    });
    changeContent('create_post', 'popup')
  };

  const handlePublishNow = () => {
    if (!item.summary) return addNotification("Нельзя публиковать пустой пост", "info");
    const channelId = selectedChannel?.id;
    const telegramId = selectedChannel?.ownerTelegramId;
    const serverPostId = item.id;

    sendPost(
      { postId: serverPostId, channelId, channelTelegramId: telegramId },
      {
        onSuccess: () => {
          deletePost(item.id);
          addNotification("Пост успешно опубликован", "success");
        },
        onError: (err) => addNotification(err.message || "Ошибка публикации поста", "error"),
      }
    );
  };
  console.log(item)
  return (
    <CardPablishItem $bg={bg}>
      <CardPablishItemHead>
        <CardPablishItemName>
          {selectedChannel.avatarUrl ? (
            <CardPablishItemImg src={selectedChannel.avatarUrl} alt={selectedChannel.name} />
          ) : (
            <AvaPlug width="32px" height="32px" />
          )}
          <p>{selectedChannel.name}</p>
        </CardPablishItemName>
          <CardPablishItemTime>
            <p>Дата создания поста:</p>
            <span>
              {new Date(item.createdAt).toLocaleDateString("ru-RU")}{" "}
              {new Date(item.createdAt).toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </CardPablishItemTime>  
      </CardPablishItemHead>
      <CardPablishImages>
        {item.images.slice(0, MAX_VISIBLE_IMAGES).map((elem, index) => {
          const isLastVisible = index === MAX_VISIBLE_IMAGES - 1;
          const extraCount = item.images.length - MAX_VISIBLE_IMAGES;

          const src = elem instanceof File || elem instanceof Blob ? URL.createObjectURL(elem) : normalizeUrl(elem);

          return (
            <ImageItemWrapper
              key={index}
              onClick={() =>
                openLightbox({
                  images: item.images.map(i => i instanceof File || i instanceof Blob ? URL.createObjectURL(i) : normalizeUrl(i)),
                  initialIndex: index
                })
              }
            >
              <ImageItem
                src={src}
                alt={`картинка ${index}`}
              />
              {isLastVisible && extraCount > 0 && (
                <Overlay>
                  +{extraCount}
                </Overlay>
              )}
            </ImageItemWrapper>
          );
        })}
      </CardPablishImages>
      <CardPablishText>{item.title}</CardPablishText>
      <CardPablishSubtext
        dangerouslySetInnerHTML={{ __html: item.summary }}
      />
      <CardPablishButtons>
        <BtnBase
          $padding="16px 12px"
          $border
          $width="100%"
          $bg="transporent"
          $color="#D6DCEC"
          onClick={handlePublishNow}
          disabled={isSendPending}
        >
          {isSendPending ? "Публикация..." : "Опубликовать сейчас"}
        </BtnBase>
        <CardButton onClick={() => changeContent('live_preview_popup', 'popup', { selectedPost: item, channelId: selectedChannel?.id })}>
          <EyeIcon />
        </CardButton>
        <CardButton onClick={handleEdit}>
          <EditIcon />
        </CardButton>
        <CardButton
          onClick={(e) => {
            e.stopPropagation();
            changeContent("delete_confirm", "popup_window", {
              itemName: item.title,
              onDelete: () => deletePost(item.id),
            });
          }}
          disabled={deletePending}>
          <DelIcon />
        </CardButton>
        <CardButton
          onClick={() =>
            changeContent("change_time_card", "popup_window", {
              postId: item.id,
              channelId: selectedChannel?.id,
              time: item.publishedAt,
            })
          }
        >
          <TimeIcon />
        </CardButton>
      </CardPablishButtons>
    </CardPablishItem>
  )
}

const CardPablishOpen = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  border: 2px solid #1C2438;
`

const CardPablishItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative; 
  box-sizing: border-box;
  padding: 20px;
  border: 2px solid ${({ $bg }) => $bg ? '#181F30' : '#1F273B'};
  border-radius: 24px;
  background-color: ${({ $bg }) => $bg ? '#181F30' : 'transporent'};

  &:hover {
    background-color: #181F30;
    border: 2px solid #181F30;
    ${CardPablishOpen} {
      background-color: #1C2438;
      
			svg path {
        stroke: #D6DCEC; 
      }
    }
  }
`
const CardPablishItemHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`
const CardPablishItemName = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
    
  p {
    max-width: 100px;         
    white-space: nowrap;  
    overflow: hidden;     
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 700;
  }
`
const CardPablishItemImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`

const CardPablishItemTime = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  font-size: 14px;
  font-weight: 700;
  p {
    text-align: right;
    font-size: 13px;
  }
  span {
    text-align: right;
    font-size: 12px;
    color:#6A7080;
  }
`
const CardPablishImages = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  flex-grow: 1;
`
const ImageItemWrapper = styled.div`
  position: relative;
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
`;
const ImageItem = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  color: #fff;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CardPablishText = styled.p`
  box-sizing: border-box;
  margin-top: 18px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
const CardPablishSubtext = styled.p`
  box-sizing: border-box;
  margin-top: 16px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  color: #6A7080;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
`
const CardPablishButtons = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
`
const CardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  flex-shrink: 0;
  transition: all 0.2s;
  border: 2px solid #2F3953;
  color: #6A7080;

  &:hover {
    transform: scale(1.1);    
    color: #fff;
  }
`

export default CardPablish