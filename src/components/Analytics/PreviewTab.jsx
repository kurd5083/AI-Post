import { useRef, useState, useEffect } from "react";
import styled from "styled-components";

import users from "@/assets/users.svg";
import pointLine from "@/assets/point-line.svg";
import list from "@/assets/list.svg";
import tape from "@/assets/tape.svg";
import ArrowIcon from "@/icons/ArrowIcon";
import EyeIcon from "@/icons/EyeIcon";
import TimeIcon from "@/icons/TimeIcon";

import CustomSelectThree from "@/shared/CustomSelectThree";

import useFadeOnScroll from "@/lib/useFadeOnScroll";

const mentions = [
  {
    id: 1,
    name: "Antropia Digital",
    audience: "5.092.302",
    avatar: "",
    time: "2 часа назад",
    action: "Упомянул канал",
    title: "Новые тренды в цифровом маркетинге",
    text: "Обзор ключевых изменений в маркетинговых стратегиях для соцсетей и рекламы.",
    views: "12.3k",
    comments: "34",
	channel: '@Antropia_Gaming'
  },
  {
    id: 2,
    name: "Design Trends",
    audience: "2.281.930",
    avatar: "",
    time: "2 часа назад",
    action: "Упомянул канал",
    title: "Мобильный UI 2025",
    text: "Разбор трендов в визуальном стиле и UX обработке действий.",
    views: "8.1k",
    comments: "21",
		channel: '@Antropia_Gaming'
  },
  {
    id: 3,
    name: "ArtLab Studio",
    audience: "890.412",
    avatar: "",
    time: "2 часа назад",
    action: "Упоминание",
    title: "AI в сценографии",
    text: "Как Midjourney и Stable Diffusion уже меняют индустрию театра.",
    views: "4.7k",
    comments: "12",
		channel: '@Antropia_Gaming'
  },
  {
    id: 4,
    name: "Digital News",
    audience: "1.044.880",
    avatar: "",
    time: "2 часа назад",
    action: "Упомянул канал",
    title: "IT события недели",
    text: "Главные новости IT-индустрии за последнюю неделю: релизы, обновления и аналитика.",
    views: "9.2k",
    comments: "18",
		channel: '@Antropia_Gaming'
  }
];
const posts = [
	{
		id: 1,
		author: "CNN",
		avatar: "",
		time: "1 час назад",
		title: "Новогодние праздники",
		text: "Одежду для питомцев, набор для гадания на гуще игрушечных гномов и снеговика оставили в метро",
		views: "1.5к",
		comments: "14",
	},
	{
		id: 2,
		author: "Antropia Gaming",
		avatar: "",
		time: "2 часа назад",
		title: "Бесплатные ассеты",
		text: "Подборка лучших бесплатных ассетов Unreal Engine и Unity",
		views: "980",
		comments: "6",
	},
	{
		id: 3,
		author: "Design Trends",
		avatar: "",
		time: "5 часов назад",
		title: "Мобильный UI 2025",
		text: "Разбор трендов в визуальном стиле и UX обработке действий",
		views: "2.1к",
		comments: "44",
	},
	{
		id: 4,
		author: "ArtLab Studio",
		avatar: "",
		time: "1 день назад",
		title: "AI в сценографии",
		text: "Как Midjourney и Stable Diffusion уже меняют индустрию театра",
		views: "740",
		comments: "2",
	},
];
const PreviewTab = () => {
	const { fadeVisible: fadeMentions, ref: fadeMentionsRef } = useFadeOnScroll(20);
	const { fadeVisible: fadePosts, ref: fadePostsRef } = useFadeOnScroll(20);
	const [viewMode, setViewMode] = useState("List");

	const mentionsRef = useRef();
	const postsRef = useRef();

	const [mentionsWidth, setMentionsWidth] = useState(0);
	const [postsWidth, setPostsWidth] = useState(0);

	useEffect(() => {
		const updateWidths = () => {
			if (mentionsRef.current) {
				setMentionsWidth(mentionsRef.current.offsetWidth);
			}
			if (postsRef.current) {
				setPostsWidth(postsRef.current.offsetWidth);
			}
		};

		updateWidths();
		window.addEventListener("resize", updateWidths);
		return () => window.removeEventListener("resize", updateWidths);
	}, []);
	const handleChange = (newValue) => {
		if (!newValue) return;
		setViewMode(newValue);
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
					ref={el => {
						mentionsRef.current = el;
						if (fadeMentionsRef) fadeMentionsRef.current = el;
					}}
					$fadeVisible={fadeMentions}
					$containerWidth={mentionsWidth}
				>
					{mentions.map(m => (
						viewMode === 'List' ? (
							<MentionCard key={m.id}>
							<MentionsCardChannelInfo>
								<ChannelAva src={m.avatar} alt="" />
								<ChannelInfoContainer>
									<ChannelName>{m.name}</ChannelName>
									<MentionsCardAudience>
										<img src={users} alt="users icon" />
										{m.audience}
									</MentionsCardAudience>
								</ChannelInfoContainer>
							</MentionsCardChannelInfo>
							<MentionsCardMeta>
								<MentionsCardMentionFrom>{m.action}</MentionsCardMentionFrom>
								<MentionsCardTimestamp>
									<TimeIcon color="#6A7080" />{m.date}
								</MentionsCardTimestamp>
							</MentionsCardMeta>
						</MentionCard>
						) : (
							<PostsCard key={m.id}>
								<PostHead>
									<PostChannelAva src={m.avatar} />
									<PostChannelName>{m.author}</PostChannelName>
									<PostTime><TimeIcon color="#6A7080" />{m.time}</PostTime>
								</PostHead>
								<PostTitle>{m.title}</PostTitle>
								<PostText>{m.text}<br/>В <span>{m.channel}</span></PostText>
								<PostFooter>
									<PostFooterParams>
										<p><EyeIcon color="#336CFF" hoverColor="#336CFF" width={20} height={20} cursor="default" /> {m.views}</p>
										<p><img src={pointLine} alt="" /> {m.comments}</p>
									</PostFooterParams>
									<MentionsCardMentionFrom>{m.action}</MentionsCardMentionFrom>
								</PostFooter>
							</PostsCard>
						)
					))}
				</MentionsList>
			</div>
			<div>
				<PreviewTitle>Посты канала</PreviewTitle>
				<PreviewDescription>Лента с постами и статистикой отслеживаемого вами канала</PreviewDescription>
				<PostsList
					ref={el => {
						postsRef.current = el;
						if (fadePostsRef) fadePostsRef.current = el;
					}}
					$fadeVisible={fadePosts}
					$containerWidth={postsWidth}
				>
					{posts.map(p => (
							<PostsCard key={p.id}>
								<PostHead>
									<PostChannelAva src={p.avatar} />
									<PostChannelName>{p.author}</PostChannelName>
									<PostTime><TimeIcon color="#6A7080" />{p.time}</PostTime>
								</PostHead>
								<PostTitle>{p.title}</PostTitle>
								<PostText>{p.text}</PostText>
								<PostFooter>
									<PostFooterParams>
										<p><EyeIcon color="#336CFF" hoverColor="#336CFF" width={20} height={20} cursor="default" /> {p.views}</p>
										<p><img src={pointLine} alt="" /> {p.comments}</p>
									</PostFooterParams>
									<PostArrow>
										<ArrowIcon color="#6A7080" hoverColor="#6A7080" />
									</PostArrow>
								</PostFooter>
							</PostsCard>
					
					))}
				</PostsList>
			</div>
		</PreviewContainer>
	)
}
const PreviewContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
  margin-top: 40px;
  gap: 64px;
  padding: 0 56px;

  @media(max-width: 1600px) { 
    padding: 0 32px 
  }	
  @media(max-width: 768px) { 
    padding: 0 24px
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

	${({ $forceHorizontal, $fadeVisible, $containerWidth }) =>
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
  `}
`;
const MentionCard = styled.div`
	display: flex;
	justify-content: space-between;
	flex: 1;
	padding: 22px 32px;
	border: 2px solid #333E59;
	border-radius: 24px;
`;

const MentionsCardChannelInfo = styled.div`
	display: flex;
	align-items: center;
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
const MentionsCardAudience = styled.span`
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

	${({ $forceHorizontal, $fadeVisible, $containerWidth }) =>
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
  `}
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
	align-items: center;
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
const PostTitle = styled.h4`
	font-family: "Montserrat Alternates", sans-serif;
	font-size: 24px;
	font-weight: 700;
`;
const PostText = styled.p`
	font-size: 14px;
	font-weight: 600;
	line-height: 20px;
	color: #6A7080;
	span {
		color: #336CFF;
	}
`;
const PostChannel = styled.span`
	font-size: 14px;
	font-weight: 600;
	line-height: 20px;
`;

const PostFooter = styled.div`
	display: flex;
	justify-content: space-between;
`;
const PostFooterParams = styled.div`
	display: flex;
	gap: 24px;

	p {
		display: flex;
		align-items: center;
		gap: 16px;
		font-weight: 600;
	}
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