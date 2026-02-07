import styled from "styled-components";
import ArrowIcon from "@/icons/ArrowIcon";
import TimeIcon from "@/icons/TimeIcon";
import timeAgo from "@/lib/timeAgo";

const MentionsCard = ({ item, bg }) => {
  
  const post = item?.postDetails;
  return (
		<MentionsCardItem $bg={bg}>
			<MentionsCardItemHead>
				<MentionsCardItemName>
					<MentionsCardItemImg src={post?.image} alt={item?.username} />
					<p>{post?.channelTitle}</p>
				</MentionsCardItemName>
				<MentionsCardItemTime>
          <TimeIcon/>
          {timeAgo(post?.date * 1000)}
				</MentionsCardItemTime>
			</MentionsCardItemHead>
			<MentionsCardText
        dangerouslySetInnerHTML={{ __html: post?.text }}
      />
			<MentionsCardOpen onClick={() => window.open(item.postLink, "_blank")}>
        <ArrowIcon color="#D6DCEC" />
      </MentionsCardOpen>
		</MentionsCardItem>
	)
}
const MentionsCardOpen = styled.button`
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

const MentionsCardItem = styled.div`
  position: relative; 
  box-sizing: border-box;
  padding: 20px;
  border: 2px solid ${({ $bg }) => $bg ? '#181F30' : '#1F273B'};
  border-radius: 24px;
  background-color: ${({ $bg }) => $bg ? '#181F30' : 'transparent'};
  height: 140px;

  &:hover {
    background-color: #181F30;
    border: 2px solid #181F30;
    ${MentionsCardOpen} {
      background-color: #1C2438;
    }
  }
`
const MentionsCardItemHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const MentionsCardItemName = styled.div`
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
const MentionsCardItemImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`
const MentionsCardItemTime = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
`
const MentionsCardText = styled.p`
  box-sizing: border-box;
  margin-top: 26px;
  font-size: 18px;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-right: 40px;
  font-family: "Montserrat Alternates", sans-serif;
`

export default MentionsCard