import styled from "styled-components";

import users from "@/assets/users.svg";
import TimeIcon from "@/icons/TimeIcon";
import EyeIcon from "@/icons/EyeIcon";
import pointLine from "@/assets/point-line.svg";
import ArrowIcon from "@/icons/ArrowIcon";

import BtnBase from "@/shared/BtnBase";

import useFadeOnScroll from "@/lib/useFadeOnScroll";

const mentions = [
	{
		id: 1,
		name: "Antropia Digital",
		audience: "5.092.302",
		avatar: "",
		date: "15 янв, 16:47",
		action: "Упомянул канал"
	},
	{
		id: 2,
		name: "Design Trends",
		audience: "2.281.930",
		avatar: "",
		date: "14 янв, 12:20",
		action: "Упомянул канал"
	},
	{
		id: 3,
		name: "ArtLab Studio",
		audience: "890.412",
		avatar: "",
		date: "13 янв, 19:03",
		action: "Упоминание"
	},
	{
		id: 4,
		name: "Digital News",
		audience: "1.044.880",
		avatar: "",
		date: "12 янв, 09:57",
		action: "Упомянул канал"
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
	const { fadeVisible: fadeMentions, ref: mentionsRef } = useFadeOnScroll(20);
	const { fadeVisible: fadePosts, ref: postsRef } = useFadeOnScroll(20);
	return (
		<PreviewContainer>
			<div>
				<MentionsHeader>
					<PreviewTitle>Лента упоминаний</PreviewTitle>
					<BtnBase $bg="#192537" $color="#5ABAFF">Фильтрация</BtnBase>
				</MentionsHeader>
				<PreviewDescription>
					Просмотрите ленту, где указаны каналы, которые вас упомянули
				</PreviewDescription>
				<MentionsList $fadeVisible={fadeMentions} ref={mentionsRef}>
					{mentions.map(m => (
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
					))}
				</MentionsList>
			</div>
			<div>
				<PreviewTitle>Посты канала</PreviewTitle>
				<PreviewDescription>Лента с постами и статистикой отслеживаемого вами канала</PreviewDescription>
				<PostsList $fadeVisible={fadePosts} ref={postsRef}>
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
									<ArrowIcon color="#6A7080" hoverColor="#6A7080"/>
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
  padding: 0 56px 30px;

  @media(max-width: 1600px) { 
    padding: 0 32px 30px 
  }	
  @media(max-width: 768px) { 
    padding: 0 24px 30px
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
const PreviewDescription = styled.p`
	max-width: 370px;
	margin-top: 6px;
	color: #6A7080;
	font-size: 14px;
	line-height: 24px;
	font-weight: 600;
`;
const MentionsList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 18px;
	margin-top: 40px;
	max-height: 300px;
	overflow-y: auto;
  scrollbar-width: none;


	${({ $forceHorizontal, $fadeVisible }) =>
		!$forceHorizontal &&
		`
      &::after {
        content: '';
        position: fixed;
        bottom: 0;
        height: 135px;
        width: 100%;
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
	display: flex;
	flex-direction: column;
	gap: 18px;
	margin-top: 40px;
	max-height: 330px;
	overflow-y: auto;
  scrollbar-width: none;

	${({ $forceHorizontal, $fadeVisible }) =>
		!$forceHorizontal &&
		`
      &::after {
        content: '';
        position: fixed;
        bottom: 0;
        height: 135px;
        width: 100%;
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