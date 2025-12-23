import styled from "styled-components";
import { useParams, useNavigate } from 'react-router-dom';
import fire from "@/assets/tape/fire.svg";
import TimeIcons from "@/icons/TimeIcons";
import TapeList from "@/components/TapeList";
import BtnBase from "@/shared/BtnBase";
import { useCopyNewsToChannel } from "@/lib/news/useCopyNewsToChannel";
import { usePopupStore } from "@/store/popupStore"
import { useNewsById } from "@/lib/news/useNewsById";

const NewsDetail = () => {
	const { popup } = usePopupStore();
  const channelId = popup?.data?.channelId;
	const { id } = useParams();
	const navigate = useNavigate();

	const { news } = useNewsById(id);

	const { mutate: copyToChannel, isLoading: isCopying } = useCopyNewsToChannel();

	const handleCopy = () => {
		copyToChannel({
			id: id,
			data: {
				channelId: channelId,
				publishedAt: new Date().toISOString(),
				calendarScheduledAt: new Date().toISOString(),
			},
		});
	};

	if (!news) {
		return (
			<div className="not-found">
				<h1>Новость не найдена</h1>
				<button onClick={() => navigate('/')}>
					Вернуться к домой
				</button>
			</div>
		);
	}

	return (
		<NewsContainer>
			<NewsTitle>
				<img src={fire} alt="fire icon" />
				<mark>Лайв</mark> лента
			</NewsTitle>
			<NewsPost>
				<PostLeft>
					<PostHead>
						{/* <img src={news.ava} alt="ava icon" /> */}
						<p>{news.sourceName}</p>
					</PostHead>
					<NewsImgMobile src={`/.netlify/functions/api-proxy/${news.images[0]}`} alt={news.title} />
					<PostTimeMobile ><TimeIcons color="#336CFF" />{news.readingTime}</PostTimeMobile>
					<PostTilte>{news.title}</PostTilte>
					<PostDescription>{news.content}</PostDescription>
					<PostFooter className="news-meta">
						<BtnBase 
							$bg="#336CFF" 
							$color="#fff" 
							$padding="21px 40px"
							onClick={handleCopy}
							disabled={isCopying}
							>
							{isCopying ? "Сохраняем..." : "Сохранить в канал"}
						</BtnBase>
						<PostTime><TimeIcons color="#336CFF" />{news.readingTime}</PostTime>
					</PostFooter>
				</PostLeft>
				<NewsImg src={`/.netlify/functions/api-proxy/${news.images[0]}`} alt={news.title} />
			</NewsPost>
			<NewsSubTitle>Другие новости</NewsSubTitle>
			<TapeList forceHorizontal={true} padding={true} />
		</NewsContainer>
	);
}
const NewsContainer = styled.div`
	@media(max-width: 1600px) {
  	padding-bottom: 30px;
  }
`
const NewsTitle = styled.h1`
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 48px;
  font-size: 48px;
  font-weight: 900;
	margin-top: 16px;
	padding: 0 56px;

	@media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
	@media(max-width: 480px) {
		line-height: 40px;
  	font-size: 40px;
  }

  img {
    width: 25px;
    height: 32px;
		margin-right: 14px;
  }
  
  mark {
    position: relative;
    color: transparent;
    background: radial-gradient(circle, #FFBD5A, #EF6284, #5D2076, #5B1F74);
    background-size: 250px;
    background-position: -30px;
    background-clip: text;
  }
`
const NewsPost = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 48px 56px 0;
	padding: 32px;
	background-color: #1E2639;
	border-radius: 24px;
	gap: 48px;

	@media(max-width: 1600px) {
    margin: 48px 32px 0
  }
  @media(max-width: 768px) {
    margin: 48px 24px 0
  }
	@media(max-width: 480px) {
		margin: 40px 24px 0;
    padding: 24px;
  }
`
const PostLeft = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	max-width: 620px;
	width: 100%;

	@media (max-width: 1400px) {
    max-width: 100%;
  }
`
const PostHead = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  font-weight: 700;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
`
const NewsImgMobile = styled.img`
	display: none;
	max-width: 480px;
	width: 100%;
	max-height: 330px;
	border-radius: 24px;
	object-fit: cover;

	@media (max-width: 1400px) {
    display: block;
  }
`
const PostTimeMobile = styled.p`
  display: none;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
	
	@media (max-width: 480px) {
   display: flex;
  }
`
const PostTilte = styled.h2`
  font-size: 32px;
  line-height: 32px;
  font-weight: 700;
  padding-left: 8px;
	@media(max-width: 480px) {
    font-size: 24px;
  	line-height: 24px;
  }
`
const PostDescription = styled.p`
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  padding-left: 8px;
  color: #6A7080;
  white-space: pre-line;
`
const NewsImg = styled.img`
	max-width: 480px;
	width: 100%;
	max-height: 330px;
	border-radius: 24px;
	object-fit: cover;

	@media (max-width: 1400px) {
    display: none;
  }
`
const PostFooter = styled.div`
	flex-grow: 1;
  display: flex;
	justify-content: space-between;
  align-items: flex-end;
`
const PostTime = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;

	@media (max-width: 480px) {
   display: none;
  }
`
const NewsSubTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
	margin-top: 40px;
	padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`

export default NewsDetail;