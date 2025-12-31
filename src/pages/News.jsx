import styled from "styled-components";
import { useParams } from 'react-router-dom';
import fire from "@/assets/tape/fire.svg";
import TimeIcons from "@/icons/TimeIcons";
import TapeList from "@/components/TapeList";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore"
import { useNews } from "@/lib/news/useNews";
import { useNewsById } from "@/lib/news/useNewsById";
import { useFormattedHtml } from "@/lib/useFormattedHtml";
import ModernLoading from "@/components/ModernLoading";
import news_stub from "@/assets/news-stub.png";
import dzen_icon from "@/assets/dzen-icon.svg";
import { useLightboxStore } from "@/store/lightboxStore";

const NewsDetail = () => {
	const { openPopup } = usePopupStore();
	const { openLightbox } = useLightboxStore();
	const { id } = useParams();
	const { newsData, newsLoding } = useNews({});
	const { news, newsIdLoading } = useNewsById(id);
	const formattedTitle = useFormattedHtml(news?.title);
	const formattedContent = useFormattedHtml(news?.summary);

	return (
		<NewsContainer>
			<NewsTitle>
				<img src={fire} alt="fire icon" />
				<mark>Лайв</mark> лента
			</NewsTitle>
			{!newsIdLoading ? (
				<>
					<NewsPost>
						<PostLeft>
							<PostHead>
								<img src={dzen_icon} alt="ava icon" />
								<p>{news?.sourceName}</p>
							</PostHead>
							<NewsImgMobile src={`http://77.37.65.40:3000/${news?.images[0]}`} alt={news?.title} />
							<PostTimeMobile ><TimeIcons color="#336CFF" />{news?.readingTime}</PostTimeMobile>
							<PostTilte dangerouslySetInnerHTML={{ __html: formattedTitle }} />
							<PostDescription dangerouslySetInnerHTML={{ __html: formattedContent }} />
							<PostFooter className="news-meta">
								<BtnBase
									$bg="#336CFF"
									$color="#fff"
									$padding="21px 40px"
									onClick={() => openPopup("select_channel", "popup_window", { newsId: id })}
								>
									Сохранить в канал
								</BtnBase>
								<PostTime><TimeIcons color="#336CFF" />{news?.readingTime}</PostTime>
							</PostFooter>
						</PostLeft>
						<NewsImg 
							src={news?.images && news?.images[0] 
									? `http://77.37.65.40:3000/${news?.images[0]}` 
									: news_stub} 
							alt={news?.title} 
							onClick={() => openLightbox(news?.images && news?.images[0] ? `http://77.37.65.40:3000/${news?.images[0]}` : news_stub, 1)}
						/>
					</NewsPost>
				</>
			) : (
				<ModernLoading text="Загрузка новости..." />
			)}
			<NewsSubTitle>Другие новости</NewsSubTitle>
			<TapeList 
				forceHorizontal={true} 
				padding={true} 
				newsData={newsData?.data || []}
				loading={newsLoding}
			/>
		</NewsContainer>
	);
}
const NewsContainer = styled.div`
	flex: 1;

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
	/* max-width: 620px; */
	width: 100%;

	/* @media (max-width: 1400px) {
    max-width: 100%; */
  /* } */
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