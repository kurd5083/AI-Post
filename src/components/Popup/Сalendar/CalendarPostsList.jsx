import styled from "styled-components";

const CalendarPostsList = ({ posts }) => {
  console.log(posts, '3')
    // if (!posts || posts.length === 0) return;

    const formatTime = (dateStr) => {
        const d = new Date(dateStr);
        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
    };
    return (
        <ListContainer>
            {posts?.map((post) => (
                <PostItem key={post.id}>
                    <Time>{formatTime(post.scheduledAt)}</Time>
                    <Content>
                        <Title>{post.title}</Title>
                        <Description>{post.description}</Description>
                    </Content>
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
  gap: 16px;
  padding: 12px 16px;
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
  width: 60px;
  flex-shrink: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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

const EmptyText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #6a7080;
  margin-top: 24px;
`;
export default CalendarPostsList;