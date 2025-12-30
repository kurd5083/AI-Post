import styled from "styled-components";
import { useDeleteCalendarEvent } from "@/lib/calendar/useDeleteCalendarEvent";

const CalendarPostsList = ({ posts }) => {
  const { mutate: deleteMutation } = useDeleteCalendarEvent();

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleDelete = (id) => {
    if (confirm("Вы уверены, что хотите удалить этот пост?")) {
      deleteMutation(id);
    }
  };

  if (!posts || posts.length === 0) {
    return <EmptyText>Нет запланированных постов</EmptyText>;
  }

  return (
    <ListContainer>
      {posts.map((post) => (
        <PostItem key={post.id}>
          <Time>{formatTime(post.scheduledAt)}</Time>
          <Content>
            <Title>{post.title}</Title>
            <Description>{post.description}</Description>
            <Meta>
              <MetaItem><strong>Channel ID:</strong> {post.channelId}</MetaItem>
              <MetaItem><strong>Status:</strong> {post.status}</MetaItem>
              <MetaItem><strong>Event Type:</strong> {post.eventType}</MetaItem>
              <MetaItem><strong>Scheduled:</strong> {new Date(post.scheduledAt).toLocaleString()}</MetaItem>
              <MetaItem><strong>Duration:</strong> {post.duration} мин</MetaItem>
            </Meta>
          </Content>
          <DeleteButton onClick={() => handleDelete(post.id)} disabled={deleteMutation.isLoading}>
            {deleteMutation.isLoading ? "Удаление..." : "Удалить"}
          </DeleteButton>
        </PostItem>
      ))}
    </ListContainer>
  );
};

// --- Styled Components ---

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
  background-color: #1f203d;
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

const DeleteButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:enabled {
    background-color: #ff7875;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const EmptyText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #6a7080;
  margin-top: 24px;
`;

export default CalendarPostsList;
