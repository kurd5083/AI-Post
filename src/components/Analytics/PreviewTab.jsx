import { useRef, useState, useEffect } from "react";
import styled from "styled-components";

import users from "@/assets/users.svg";
import list from "@/assets/list.svg";
import tape from "@/assets/tape.svg";
import ArrowIcon from "@/icons/ArrowIcon";
import EyeIcon from "@/icons/EyeIcon";
import TimeIcon from "@/icons/TimeIcon";

import СhannelPlug from '@/shared/СhannelPlug';
import CustomSelectThree from "@/shared/CustomSelectThree";
import Empty from '@/shared/Empty';

import { useMentions } from "@/lib/tgStat/useMentions";
import { useGetPostsLastDay } from "@/lib/posts/useGetPostsLastDay";

// import useFadeOnScroll from "@/lib/useFadeOnScroll";	
const months = [
	"янв", "фев", "мар", "апр", "май", "июн",
	"июл", "авг", "сен", "окт", "ноя", "дек"
];

const formatPostDate = (timestamp) => {
	const d = new Date(timestamp * 1000);
	const day = d.getDate();
	const month = months[d.getMonth()];
	const hours = String(d.getHours()).padStart(2, "0");
	const minutes = String(d.getMinutes()).padStart(2, "0");
	return `${day} ${month}, ${hours}:${minutes}`;
};

const PreviewTab = ({ channel_id, id, channelName }) => {
	// const { fadeVisible: fadeMentions, ref: fadeMentionsRef } = useFadeOnScroll(20);
	// const { fadeVisible: fadePosts, ref: fadePostsRef } = useFadeOnScroll(20);
	const [viewMode, setViewMode] = useState("List");
	const { postsLastDay, postsLastDayPending } = useGetPostsLastDay(channel_id);
  console.log(postsLastDay)
	// const mentionsRef = useRef();
	// const postsRef = useRef();

	// const [mentionsWidth, setMentionsWidth] = useState(0);
	// const [postsWidth, setPostsWidth] = useState(0);

	// useEffect(() => {
	// 	const updateWidths = () => {
	// 		if (mentionsRef.current) {
	// 			setMentionsWidth(mentionsRef.current.offsetWidth);
	// 		}
	// 		if (postsRef.current) {
	// 			setPostsWidth(postsRef.current.offsetWidth);
	// 		}
	// 	};

	// 	updateWidths();
	// 	window.addEventListener("resize", updateWidths);
	// 	return () => window.removeEventListener("resize", updateWidths);
	// }, []);

	const { mentions, mentionsPending } = useMentions({
		channelId: id,
		limit: 8,
	});

	const handleChange = (newValue) => {
		if (!newValue) return;
		setViewMode(newValue);
	};

  const getFirstTextBetweenStars = (text) => {
    const match = text.match(/\*\*(.*?)\*\*/);
    if (!match) return "";
    return match[1];
  };
	return (
		<PreviewContainer>
			<div>
				<MentionsHeader>
					<PreviewTitle>Лента упоминаний</PreviewTitle>
					<FilterBlock>
						<img src={viewMode === 'List' ? list : tape} alt="view icon" />
						<CustomSelectThree
							options={[
								{ id: 'List', label: 'Список' },
								{ id: 'Tape', label: 'Лента' },
							]}
							value={viewMode}
							onChange={handleChange}
							width="min-content"
							right="-20px"
						/>
					</FilterBlock>
				</MentionsHeader>
				<PreviewDescription>
					Просмотрите ленту, где указаны каналы, которые вас упомянули
				</PreviewDescription>
				<MentionsList
				// ref={el => {
				// 	mentionsRef.current = el;
				// 	if (fadeMentionsRef) fadeMentionsRef.current = el;
				// }}
				// $fadeVisible={fadeMentions}
				// $containerWidth={mentionsWidth}
				>
					{mentionsPending ? (
						<Empty icon="📣">Загрузка упоминаний...</Empty>
					) : (
						mentions?.response?.items.length === 0 ? (
							<Empty icon="📣">Упоминаний нет</Empty>
						) : (
							mentions?.response?.items.map(m => (
								viewMode === 'List' ? (
									<MentionCard key={m.id}>
										<MentionsCardChannelInfo>
											<ChannelAva src={m.postDetails.image} alt="" />
											<ChannelInfoContainer>
												<ChannelName>{m.postDetails.channelTitle}</ChannelName>
												<CardDetail>
													<MentionsCardParams>
														<img src={users} alt="users icon" />
														{m.postDetails.audience}
													</MentionsCardParams>
													<MentionsCardParams>
														<EyeIcon color="#6A7080" hoverColor="#6A7080" width={17} height={12} cursor="default" />
														{m.postDetails.views}
													</MentionsCardParams>
												</CardDetail>
											</ChannelInfoContainer>
										</MentionsCardChannelInfo>
										<MentionsCardMeta>
											<MentionsCardMentionFrom>Упомянул канал</MentionsCardMentionFrom>
											<MentionsCardTimestamp>
												<TimeIcon color="#6A7080" />
												{formatPostDate(m.postDetails.date)}
											</MentionsCardTimestamp>
										</MentionsCardMeta>
									</MentionCard>
								) : (
									<PostsCard key={m.id}>
										<PostHead>
											<PostChannelAva src={m.postDetails.image} />
											<PostChannelName>{m.postDetails.channelTitle}</PostChannelName>
											<PostTime><TimeIcon color="#6A7080" />{formatPostDate(m.postDetails.date)}</PostTime>
										</PostHead>
										<PostText dangerouslySetInnerHTML={{ __html: m.postDetails.text }} />
										<PostFooter>
											<PostFooterParams><EyeIcon color="#336CFF" hoverColor="#336CFF" width={20} height={20} cursor="default" />{m.postDetails.views}</PostFooterParams>
											<MentionsCardMentionFrom>Упомянул канал</MentionsCardMentionFrom>
										</PostFooter>
									</PostsCard>
								)
							))
						)
					)}
				</MentionsList>
			</div>
			<div>
				<PreviewTitle>Посты канала</PreviewTitle>
				<PreviewDescription>Лента с постами и статистикой отслеживаемого вами канала</PreviewDescription>
				<PostsList
				// ref={el => {
				// 	postsRef.current = el;
				// 	if (fadePostsRef) fadePostsRef.current = el;
				// }}
				// $fadeVisible={fadePosts}
				// $containerWidth={postsWidth}
				>
					{postsLastDayPending ? (
						<Empty icon="📝">Загрузка постов...</Empty>
					) : (
						!!postsLastDay.posts && postsLastDay.posts.length == 0 ? (
							<Empty icon="📝">Постов нет</Empty>
						) : (
							postsLastDay.posts.map(p => (
								<PostsCard key={p.id}>
									<PostHead>
										<СhannelPlug width="32px" height="32px" text={channelName} radius="50%" />
										<PostChannelName>{channelName}</PostChannelName>
										<PostTime>
											<TimeIcon color="#6A7080" />
											{new Date(p.post_date).toLocaleString("ru-RU", {
												day: "numeric",
												month: "short",
												hour: "2-digit",
												minute: "2-digit",
												timeZone: "UTC",
											})}
										</PostTime>
									</PostHead>
									<PostText>{getFirstTextBetweenStars(p.text)}</PostText>
									<PostFooter>
										<PostFooterParams>
											<EyeIcon color="#336CFF" hoverColor="#336CFF" width={20} height={20} cursor="default" /> {p.views}
										</PostFooterParams>
										<PostArrow>
											<ArrowIcon color="#6A7080" hoverColor="#6A7080" />
										</PostArrow>
									</PostFooter>
								</PostsCard>
							))
						)
					)}
				</PostsList>
			</div>
		</PreviewContainer>
	)
}
const PreviewContainer = styled.div`
	display: grid;
	grid-template-columns: 2fr 1.5fr;
  margin-top: 40px;
  gap: 64px;
  padding: 0 56px;

  @media(max-width: 1600px) { 
    padding: 0 32px;
    gap: 20px;

  }	
  @media(max-width: 991px) { 
		grid-template-columns: 1fr;
  }	
  @media(max-width: 768px) { 
    padding: 0 24px;
  }
`;

const MentionsHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
`;
const PreviewTitle = styled.h3`
	font-size: 24px;
	font-weight: 700;
`;
const FilterBlock = styled.div` 
	display: flex;
	align-items: center;
	gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background-color: #1A1F2D;
`;

const PreviewDescription = styled.p`
	max-width: 370px;
	margin-top: 6px;
	color: #6A7080;
	font-size: 14px;
	line-height: 24px;
	font-weight: 600;
`;
const MentionsList = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 18px;
	margin-top: 20px;
	max-height: 330px;
	overflow-y: auto;
  scrollbar-width: none;
	padding-bottom: 30px;

	/* ${({ $forceHorizontal, $fadeVisible, $containerWidth }) =>
		!$forceHorizontal &&
		`
      &::after {
        content: '';
        position: fixed;
        bottom: 0;
        height: 135px;
        width: ${$containerWidth}px;
        background: linear-gradient(to top, #131826, transparent);
        backdrop-filter: blur(8px);
        mask-image: linear-gradient(to top, black 50%, transparent);
        transition: opacity 0.2s;
        opacity: ${$fadeVisible ? 1 : 0};
        pointer-events: none;
        z-index: 1;
        
        @media(max-width: 1400px) {
          display: none;
        }
      }
  `} */
`;
const MentionCard = styled.div`
	display: flex;
	justify-content: space-between;
	flex: 1;
	padding: 22px 32px;
	border: 2px solid #333E59;
	border-radius: 24px;
	@media(max-width: 480px) { 
    flex-direction: column;
		gap: 24px;
  }
`;

const MentionsCardChannelInfo = styled.div`
	display: flex;
	gap: 24px;
`;
const ChannelAva = styled.img`
	width: 48px;
	height: 48px;
	border-radius: 16px;
`;
const ChannelInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;
const ChannelName = styled.div`
	font-size: 16px;
	font-weight: 700;
`;
const CardDetail = styled.div`
	display: flex;
	align-items: center;
	gap: 24px;
	
`;

const MentionsCardParams = styled.span`
	display: flex;
	align-items: center;
	gap: 10px;
	color: #6A7080;
	font-size: 14px;
	font-weight: 700;
`;

const MentionsCardMeta = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
  align-items: flex-end;
  text-align: right;
  min-width: 130px;
	@media(max-width: 480px) { 
    flex-direction: row;
  }
`;
const MentionsCardMentionFrom = styled.span`
	font-size: 14px;
	font-weight: 700;
	color: #336CFF;
`;
const MentionsCardTimestamp = styled.p`
	display: flex;
	align-items: center;
	gap: 14px;
	font-size: 14px;
	font-weight: 700;
	color: #6A7080;
`;
const PostsList = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 18px;
	margin-top: 40px;
	max-height: 330px;
	overflow-y: auto;
  scrollbar-width: none;
	padding-bottom: 30px;

	/* ${({ $forceHorizontal, $fadeVisible, $containerWidth }) =>
		!$forceHorizontal &&
		`
      &::after {
        content: '';
        position: fixed;
        bottom: 0;
        height: 135px;
        width: ${$containerWidth}px;
        background: linear-gradient(to top, #131826, transparent);
        backdrop-filter: blur(8px);
        mask-image: linear-gradient(to top, black 50%, transparent);
        transition: opacity 0.2s;
        opacity: ${$fadeVisible ? 1 : 0};
        pointer-events: none;
        z-index: 1;
        
        @media(max-width: 1400px) {
          display: none;
        }
      }
  `} */
`
const PostsCard = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding: 24px;
	background-color: #1C2438;
	border-radius: 24px;
`;
const PostHead = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 16px;
`;
const PostChannelAva = styled.img`
	width: 24px;
	height: 24px;
	border-radius: 50%;
`;
const PostChannelName = styled.p`
	font-size: 14px;
	font-weight: 700;
	flex: 1;
`;
const PostTime = styled.p`
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 14px;
	font-weight: 700;
`;

const PostText = styled.h4`
	font-size: 20px;
	font-weight: 700;
	display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-right: 40px;
  font-family: "Montserrat Alternates", sans-serif;
	a, span {
		color: #336CFF;
	}
`;
const PostFooter = styled.div`
	display: flex;
	justify-content: space-between;
`;
const PostFooterParams = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
	font-weight: 600;
`;
const PostArrow = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #6A7080;
`

export default PreviewTab