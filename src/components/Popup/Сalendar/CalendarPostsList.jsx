import styled from "styled-components";
import { useDeleteCalendarEvent } from "@/lib/calendar/useDeleteCalendarEvent";
import edit from "@/assets/templates/edit.svg";
import del from "@/assets/del.svg";
import { usePopupStore } from "@/store/popupStore"
import { useNotificationStore } from "@/store/notificationStore";

const CalendarPostsList = ({ posts }) => {
  const { deleteMutation, isPending } = useDeleteCalendarEvent();
  const { popup, changeContent } = usePopupStore();
  const { addNotification } = useNotificationStore();

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleDelete = (post) => {
    if (!post?.id) {
      addNotification("Не удалось удалить пост: нет ID", "error");
      return;
    }

    deleteMutation.mutate(post.id, {
      onSuccess: () => {
        addNotification(`Пост "${post.title}" успешно удален`, "success");
      },
      onError: () => {
        addNotification(`Ошибка при удалении поста "${post.title}"`, "error");
      },
    });
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
              <MetaItem><strong>Статус</strong> {post.status}</MetaItem>
              <MetaItem><strong>Тип события:</strong> {post.eventType}</MetaItem>
              <MetaItem><strong>Запланировано:</strong> {new Date(post.scheduledAt).toLocaleString()}</MetaItem>
            </Meta>
          </Content>
          <ButtonEdit
            onClick={(e) => {
              e.stopPropagation();
              changeContent("create_calendar_event", "popup_window", {
                event: post,
                channelId: post.channelId,
              });
            }}
          >
            <img src={edit} alt="edit icon" width={22} height={16} />
          </ButtonEdit>
          <DeleteButton
            onClick={(e) => {
              e.stopPropagation(); 
              changeContent("delete_confirm", "popup_window", {
                itemName: post.title,
                onDelete: () => handleDelete(post),
              });
            }}
            disabled={isPending}
          >
            <img src={del} alt="del icon" width={14} height={16} />
          </DeleteButton>
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

  &:hover {
    background-color: #2a2b4f;
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
const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  flex-shrink: 0;
  transition: all 0.2s;
`;
const ButtonEdit = styled(BaseButton)`
	background-color: #333E59;
`;
const DeleteButton = styled(BaseButton)`
  border: 2px solid #2D3241;

  &:hover {
    border: none;
    background-color: rgba(239, 98, 132, 0.08);
  }
`
const EmptyText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #6a7080;
  margin-top: 24px;
`;

export default CalendarPostsList;
