import { useState } from "react";

import styled from "styled-components";
import { useDeleteCalendarEvent } from "@/lib/calendar/useDeleteCalendarEvent";
import { useSendPostToChannel } from "@/lib/posts/useSendPostToChannel";

import EyeIcon from "@/icons/EyeIcon";
import DelIcon from "@/icons/DelIcon";
import TimeIcon from "@/icons/TimeIcon";

import BtnBase from "@/shared/BtnBase";

import { usePopupStore } from "@/store/popupStore"
import { useNotificationStore } from "@/store/notificationStore";

import { getPostsById } from "@/api/posts/getPostsById";

const CalendarPostsList = ({ posts }) => {
  console.log(posts)
  const [publishingPosts, setPublishingPosts] = useState({});

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
    console.log(post)
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
          <Time>{formatTime(post.scheduledAt)}</Time>
          <Content>
            <Title>{post.title}</Title>
            <Description>{post.description}</Description>
            <Meta>
              <MetaItem><strong>Канал:</strong> {post.channelId}</MetaItem>
              <MetaItem>
                <strong>Запланировано:</strong>
                {(() => {
                  const d = new Date(post.scheduledAt);
                  const day = String(d.getUTCDate()).padStart(2, "0");
                  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
                  const year = d.getUTCFullYear();
                  const hours = String(d.getUTCHours()).padStart(2, "0");
                  const minutes = String(d.getUTCMinutes()).padStart(2, "0");
                  return `${day}.${month}.${year} ${hours}:${minutes}`;
                })()}
              </MetaItem>
            </Meta>
          </Content>
          <ButtonsContainer>
            <BtnBase
              $padding="16px 24px"
              $border
              $width="100%"
              $bg="transporent"
              $color="#D6DCEC"
              onClick={() => handlePublishNow(post)}
              disabled={publishingPosts[post.postId]}
            >
              {publishingPosts[post.postId] ? "Публикация..." : "Опубликовать сейчас"}
            </BtnBase>
            <Buttons>
              <ButtonEye onClick={() => handleEye(post)}>
                <EyeIcon />
              </ButtonEye>
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
                disabled={deletePending}
              >
                <DelIcon />
              </DeleteButton>
            </Buttons>
          </ButtonsContainer>
        </PostItem>
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
  padding: 0 56px;
  @media(max-width: 1600px) { padding: 0 32px }
  @media(max-width: 768px) { padding: 0 24px }
`;
const PostItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  border: 2px solid #2F3953;
  transition: all 0.2s;
  @media (max-width: 768px) {
    flex-direction: column;
  }

  &:hover {
    transform: translateY(-4px);
  }
`;
const Time = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #ac60fd;
  width: 70px;
  flex-shrink: 0;
`;
const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
`;
const Description = styled.div`
  font-size: 14px;
  color: #a0a0b8;
`;
const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
  color: #c0c0d0;
`;
const MetaItem = styled.div`
  background-color: #2a2b4f;
  padding: 4px 8px;
  border-radius: 6px;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
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
const EmptyText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #6a7080;
  margin-top: 24px;
`;

export default CalendarPostsList;
