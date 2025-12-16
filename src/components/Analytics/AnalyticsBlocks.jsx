import styled from "styled-components";
import { Link } from 'react-router';
import eye from "@/assets/analytics/eye.svg";
import eye_blue from "@/assets/eye-blue.svg";
import internet from "@/assets/analytics/internet.svg";
import ava_icon from "@/assets/ava-icon.png";
import total_number from "@/assets/analytics/total-number.svg";

const AnalyticsBlocks = () => {
	return (
		<AnalyticsContainer>
			<AnalyticsBlock>
				<AnalyticsProfileTop>
					<ProfileAvaContainer>
						<ProfileAva src={ava_icon} alt="ava icon" width={80} height={80} />
						<p>№ 35</p>
					</ProfileAvaContainer>
					<AnalyticsProfileInfo>
						<h3>Antropia Digital</h3>
						<AnalyticsProfileUl>
							<li>стиль</li>
							<li>качество</li>
							<li>дизайн</li>
						</AnalyticsProfileUl>
						<div>
							<p>Реклама: <Link to="/" target="_new">@antropia digital</Link></p>
							<p>Прислать свой дизайн: <Link to="/" target="_new">@antropia_send</Link></p>
						</div>
					</AnalyticsProfileInfo>
				</AnalyticsProfileTop>
				<AnalyticsProfileBottom>
					<p><img src={internet} alt="internet icon" />Русский</p>
					<p><img src={eye} alt="eye icon" />350</p>
				</AnalyticsProfileBottom>
			</AnalyticsBlock>
			<AnalyticsBlock>
				<h4>Подписчиков</h4>
				<AnalyticsBlockSubscribers>
					<SubscribersItem>
						<SubscribersItemTitle>Общее количество</SubscribersItemTitle>
						<SubscribersItemText><img src={total_number} alt="total number icon" />5.092,086</SubscribersItemText>
					</SubscribersItem>
					<SubscribersItem>
						<SubscribersItemTitle>Просмотров за 24 часа</SubscribersItemTitle>
						<SubscribersItemText><img src={eye_blue} alt="eye icon" />434.045</SubscribersItemText>
					</SubscribersItem>
				</AnalyticsBlockSubscribers>
			</AnalyticsBlock>
			<AnalyticsBlock>
				<h4>Статистика канала</h4>
				<AnalyticsBlockStatistics>
					<StatisticsItem>
						<StatisticsItemTitle>ER</StatisticsItemTitle>
						<StatisticsItemText><img src={total_number} alt="total number icon" />9.09%</StatisticsItemText>
						<StatisticsItemSubtext><span>Суточный:</span> 8.5%</StatisticsItemSubtext>
					</StatisticsItem>
					<StatisticsItems>
						<StatisticsItem>
							<StatisticsItemTitle>Упоминаний в Telegram</StatisticsItemTitle>
							<StatisticsItemText>24'916 / 34'385</StatisticsItemText>
						</StatisticsItem>
						<StatisticsItem>
							<StatisticsItemTitle>Упоминаний в Сторис</StatisticsItemTitle>
							<StatisticsItemText>3 / 0</StatisticsItemText>
						</StatisticsItem>
					</StatisticsItems>
				</AnalyticsBlockStatistics>
			</AnalyticsBlock>
		</AnalyticsContainer>
	)
}
const AnalyticsContainer = styled.section`
  display: flex;
  gap: 16px;
	padding: 0 56px;

	@media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`
const AnalyticsBlock = styled.div`
	box-sizing: border-box;
	padding: 32px;
  background-color: #181F30;
  border-radius: 24px;
  flex: 1;

	h4 {
		font-size: 24px;
		line-height: 24px;
		font-weight: 700;
	}
`
const AnalyticsProfileTop = styled.div`
	display: flex;
	gap: 32px;
`
const ProfileAvaContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
`

const ProfileAva = styled.img`
	border-radius: 16px;
`
const AnalyticsProfileInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	h3 {
		font-weight: 700;
		font-size: 32px;
		line-height: 36px;
		max-width: 160px;
	}
	p {
		font-size: 14px;
		font-weight: 600;
		color: #6A7080;
		a {
			color: #336CFF;
		}
	}
`
const AnalyticsProfileUl = styled.ul`
	display: flex;
	gap: 8px;
	
	li {
		padding: 16px;
		border-radius: 12px;
		color: #AC60FD;
		background-color: #242440;
		font-size: 14px;
		font-weight: 700;
	}
`

const AnalyticsProfileBottom = styled.div`
	margin-top: 40px;
	display: flex;
	justify-content: space-between;
	p {
		display: flex;
		align-items: center;
		gap: 16px;
		font-size: 14px;
		font-weight: 700;
		&:first-child {
			color: #6A7080;
		}
	}
`
const AnalyticsBlockSubscribers = styled.div`
	margin-top: 40px;
	display: flex;
	flex-direction: column;
`
const SubscribersItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	&:first-child {
		padding-bottom: 40px;
		border-bottom: 2px solid #333E59;
	}
	&:last-child {
		padding-top: 40px;
	}
`
const SubscribersItemTitle = styled.p`
	font-size: 14px;
	color: #6A7080;
	font-weight: 700;
`
const SubscribersItemText = styled.p`
	display: flex;
	gap: 16px;
	font-size: 32px;
	line-height: 32px;
	font-weight: 700;
`

const AnalyticsBlockStatistics = styled.div`
	margin-top: 40px;
	display: flex;
	flex-direction: column;
	gap: 60px;
`

const StatisticsItems = styled.div`
	display: flex;
	gap: 40px;
`
const StatisticsItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`
const StatisticsItemTitle = styled.p`
	font-size: 14px;
	color: #6A7080;
	font-weight: 700;
`
const StatisticsItemText = styled.p`
	display: flex;
	gap: 16px;
	font-size: 32px;
	line-height: 32px;
	font-weight: 700;
`
const StatisticsItemSubtext = styled.p`
	display: flex;
	gap: 8px;
	font-size: 14px;
	font-weight: 700;
	
	span {
		color: #6A7080;
	}
`
export default AnalyticsBlocks