import { useState } from "react";

import styled from "styled-components";
import { useDeleteCalendarEvent } from "@/lib/calendar/useDeleteCalendarEvent";
import { useSendPostToChannel } from "@/lib/posts/useSendPostToChannel";

import EyeIcon from "@/icons/EyeIcon";
import DelIcon from "@/icons/DelIcon";
import TimeIcon from "@/icons/TimeIcon";

import normalizeUrl from "@/lib/normalizeUrl";

import { useLightboxStore } from "@/store/lightboxStore";
import { usePopupStore } from "@/store/popupStore"
import { useNotificationStore } from "@/store/notificationStore";

import { getPostsById } from "@/api/posts/getPostsById";

const CalendarPostsList = ({ posts }) => {
  const [publishingPosts, setPublishingPosts] = useState({});

  const { openLightbox } = useLightboxStore();
  const { popup, changeContent } = usePopupStore();
  const telegramId = popup?.data?.telegramId;

  const { addNotification } = useNotificationStore();
  const { mutate: deleteMutation, isPending: deletePending } = useDeleteCalendarEvent();
  const { mutate: sendPost, isPending: isSendPending } = useSendPostToChannel();

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    const hours = String(d.getUTCHours()).padStart(2, "0");
    const minutes = String(d.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleEye = async (post) => {
    if (!post?.postId) {
      addNotification("Не удалось открыть пост: нет ID", "error");
      return;
    }

    try {
      const fullPost = await getPostsById(post.postId);

      changeContent("live_preview_popup", "popup", {
        selectedPost: fullPost,
        channelId: post.channelId,
        postId: post.id
      });
    } catch (err) {
      addNotification(err.message || "Ошибка загрузки поста", "error");
    }
  };

  const handleDelete = (post) => {
    if (!post?.id) {
      addNotification("Не удалось удалить пост: нет ID", "error");
      return;
    }
    deleteMutation(post.id);
  };

  const handlePublishNow = (post) => {
    const postId = post.postId;
    const channelId = post.channelId;

    setPublishingPosts(prev => ({ ...prev, [postId]: true }));

    sendPost(
      { postId, channelId, channelTelegramId: telegramId },
      {
        onSuccess: () => {
          addNotification("Пост успешно опубликован", "success");
        },
        onError: (err) => {
          addNotification(err.message || "Ошибка публикации поста", "error");
        },
        onSettled: () => {
          setPublishingPosts(prev => ({ ...prev, [postId]: false }));
        },
      }
    );
  };
  return (
    <ListContainer>
      {posts.map((post) => (
        <PostItem key={post.id}>
          <PostHead>
            <Time>{formatTime(post.scheduledAt)}</Time>
            {post.status === "COMPLETED" ? (
              <CardPublish $done>Опубликовано</CardPublish>
            ) : (
              <CardPublish
                $disabled={publishingPosts[post.postId]}
                onClick={() => {
                  if (publishingPosts[post.postId]) return;
                  handlePublishNow(post);
                }}
              >
                {publishingPosts[post.postId] ? "Публикация..." : "Опубликовать"}
              </CardPublish>
            )}

          </PostHead>
          <Content>
            <Title>{post.title}</Title>

            {post.post?.summary && (
              <Description>{post.post.summary}</Description>
            )}
            {post.post?.images?.length > 0 && (() => {
              const images = post.post.images;
              const visibleImages = images.slice(0, 3);
              const extraCount = images.length - 3;

              return (
                <ImagesRow>
                  {visibleImages.map((img, i) => {
                    const isLastVisible = i === 2 && extraCount > 0;

                    return (
                      <PostImageWrapper
                        key={i}
                        onClick={() =>
                          openLightbox({ images, initialIndex: i })
                        }
                      >
                        <PostImage src={normalizeUrl(img)} />

                        {isLastVisible && (
                          <Overlay>+{extraCount}</Overlay>
                        )}
                      </PostImageWrapper>
                    );
                  })}
                </ImagesRow>
              );
            })()}
            <PostFooter>
              <Meta>
                <MetaItem><strong>Канал:</strong> {post.channelId}</MetaItem>
                <MetaItem>
                  <strong>{post.status === "COMPLETED" ? "Опубликовано: " : "Запланировано: "}</strong>
                  {formatTime(post.scheduledAt)}
                </MetaItem>
              </Meta>
              <Buttons>
                <ButtonEye onClick={() => handleEye(post)}>
                  <EyeIcon />
                </ButtonEye>
                {post.status !== "COMPLETED" && (
                  <>
                    <ButtonEdit
                      onClick={(e) => {
                        e.stopPropagation();
                        changeContent("update_calendar_event", "popup_window", { event: post, channelId: post.channelId });
                      }}
                    >
                      <TimeIcon />
                    </ButtonEdit>
                    <DeleteButton
                      onClick={(e) => {
                        e.stopPropagation();
                        changeContent("delete_confirm", "popup_window", {
                          itemName: post.title,
                          onDelete: () => handleDelete(post),
                        });
                      }}
                    >
                      <DelIcon />
                    </DeleteButton>
                  </>
                )}
              </Buttons>
            </PostFooter>
          </Content>
        </PostItem>
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 56px;
  gap: 16px;
  margin-top: 24px;

  @media (max-width: 1600px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 32px;
  }
  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    padding: 0 24px;
    grid-template-columns: 1fr;
  }
`;
const PostItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  padding: 22px 24px;

  background: linear-gradient(145deg, #1b2233, #171d2b);
  border: 1px solid #2f3953;
  border-radius: 18px;

  transition: all 0.25s ease;

  &:hover {
    border-color: #ac60fd55;
    box-shadow: 0 10px 32px rgba(0,0,0,0.45);
    transform: translateY(-2px);
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const PostHead = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;
const Time = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: #ac60fd;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(172,96,253,0.08);
  border-radius: 12px;
  height: 48px;
  padding: 0 20px;
`;
const CardPublish = styled.p`
  font-size: 14px;
  font-weight: 800;

  color: ${({ $disabled, $done }) =>
    $done ? "#6A7080" : $disabled ? "#6A7080" : "#ac60fd"};

  cursor: ${({ $disabled, $done }) =>
    $disabled || $done ? "default" : "pointer"};

  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  pointer-events: ${({ $disabled, $done }) =>
    $disabled || $done ? "none" : "auto"};

  transition: 0.2s;

  &:hover {
    text-decoration: underline;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
`;
const Title = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: #ffffff;
`;
const Description = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: #9ca3af;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const ImagesRow = styled.div`
  display: flex;
  gap: 8px;
`;

const PostImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 48px;
  height: 48px;
  border-radius: 10px;
  cursor: pointer;
`;
const PostImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;

  transition: 0.2s;

  &:hover {
    transform: scale(1.06);
  }
`;
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
const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;
const PostFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  flex-grow: 1;
`;
const MetaItem = styled.div`
  background: #222a3d;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #b6bdd0;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const BaseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 2px solid #2F3953;
`;
const ButtonEye = styled(BaseButton)`
  color: #6A7080;

  &:hover {
    transform: scale(1.1);    
    color: #fff;
  }
`;
const ButtonEdit = styled(BaseButton)`
	color: #6A7080;

  &:hover {
    transform: scale(1.1);    
    color: #fff;
  }
`;
const DeleteButton = styled(BaseButton)`
  border: 2px solid #2D3241;

  &:hover {
    border: none;
    background-color: rgba(239, 98, 132, 0.08);
    transform: scale(1.1);    
  }
`

export default CalendarPostsList;