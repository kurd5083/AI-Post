import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import Empty from "@/shared/Empty";

import users from "@/assets/users.svg";
import ArrowIcon from "@/icons/ArrowIcon";

import HighlightText from "@/shared/HighlightText";
import СhannelPlug from '@/shared/СhannelPlug';

import { useGetTrackedChannels } from "@/lib/analytics/useGetTrackedChannels";

import { formatText } from "@/hooks/formatText";

const MonitoredChannels = ({ debouncedQuery }) => {
	const [atStart, setAtStart] = useState(true);
	const [atEnd, setAtEnd] = useState(false);

	const { trackedChannels, trackedChannelsPending } = useGetTrackedChannels()

	const filteredChannels = trackedChannels?.data?.filter((item) => {
		if (!debouncedQuery.trim()) return true;

		const q = debouncedQuery.toLowerCase().trim();
		return item.response.title.toLowerCase().includes(q)
	});

	return (
		<>
			{trackedChannelsPending ? (
				<EmptyContainer>
					<Empty icon="📢">Загрузка каналов...</Empty>
				</EmptyContainer>
			) : (
				filteredChannels?.length === 0 ? (
					<EmptyContainer>
						<Empty icon="📢">Нет каналов</Empty>
					</EmptyContainer>
				) : (
					<MonitoredChannelsSwiper>
						<MonitoredChannelsButton
							disabled={atStart}
							$disabled={atStart}
							className="MonitoredChannelsButtonPrev"
						>
							<ArrowIcon color="#D6DCEC" />
						</MonitoredChannelsButton >
						<MonitoredChannelsList
							spaceBetween={8}
							slidesPerView="auto"
							allowTouchMove={true}
							modules={[Navigation]}
							navigation={{
								nextEl: ".MonitoredChannelsButtonNext",
								prevEl: ".MonitoredChannelsButtonPrev",
							}}
							onReachBeginning={() => setAtStart(true)}
							onReachEnd={() => setAtEnd(true)}
							onFromEdge={() => {
								setAtStart(false);
								setAtEnd(false);
							}}
							onSlideChange={(swiper) => {
								setAtStart(swiper.isBeginning);
								setAtEnd(swiper.isEnd);
							}}
						>
							{filteredChannels.map((item) => {
								if (!item.response.title) return null
								return (
									<MonitoredChannelsItem>
										{item.response.avatar_url ? (
											<ItemAva
												src={`https://stats.aiposting.live${item.response.avatar_url}`}
												alt={item.response.title}
											/>
										) : (
											<СhannelPlug width="48px" height="48px" text={item.response.title} />
										)}

										<ItemContent> 
											<MonitoredChannelsName to={`/analytics/${item.telescopeTelegramId}?monitored=true`}>
												<HighlightText
													text={item.response.title}
													query={debouncedQuery}
												>
													{item.response.title}
												</HighlightText>
											</MonitoredChannelsName>
											<QuantityContainer>
												<img src={users} alt="users icon" />
												<MonitoredChannelsQuantity>{formatText(item.response.subscriber_count)}</MonitoredChannelsQuantity>
											</QuantityContainer>
										</ItemContent>
									</MonitoredChannelsItem>
								)
							})}
						</MonitoredChannelsList>
						<MonitoredChannelsButton
							className="MonitoredChannelsButtonNext"
							disabled={atEnd}
							$disabled={atEnd}
						>
							<ArrowIcon color="#D6DCEC" />
						</MonitoredChannelsButton>
					</MonitoredChannelsSwiper >
				)
			)}

		</>
	)
}

const MonitoredChannelsSwiper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	margin-bottom: 40px;
	margin-top: 32px;
	padding: 0 56px;

  	@media(max-width: 1600px) { 
    	padding: 0 32px 
	}	
	@media(max-width: 1400px) { 
    	padding: 0;
	}	
	@media(max-width: 768px) { 
		margin-bottom: 90px;
	}
`
const MonitoredChannelsButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;
	border-radius: 50%;
	border: 2px solid  ${({ $disabled }) => ($disabled ? "#1C2438" : "transparent")};
	background-color: ${({ $disabled }) => ($disabled ? "transparent" : "#1C2438")};
	pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
	flex-shrink: 0;

	&:first-child {
    	transform: rotate(180deg);
  	}

	@media (max-width: 1400px) {
		position: absolute;
		top: -70px;
		right: 32px;
		z-index: 2;

		&:first-child {
			right: 88px;
		}
  	}

	@media(max-width: 768px) { 
		right: 50%;
		top: auto;
		bottom: -70px;
		transform: translateX(110%);

		&:first-child {
			right: 50%;
			transform: translateX(-10%) rotate(180deg);
		}
  	}
`
const MonitoredChannelsList = styled(Swiper)`
	margin: 0 48px;
	width: 100%;
	
	@media (max-width: 1400px) {
    	margin: 0;
		padding: 0 32px;
	}
	@media(max-width: 768px) { 
		padding: 0 24px
	}
`
const MonitoredChannelsItem = styled(SwiperSlide)`
	display: flex;
	align-items: center;
	gap: 24px;
	box-sizing: border-box;
	padding: 18px 24px;
	border-radius: 16px;
	background-color: #1C2438;
	height: 85px;
	width: fit-content;

	&:last-child {
		margin-right: 0 !important;
	}
`

const ItemAva = styled.img`
	background-color: ${props => props.$bgColor};
	width: 48px;
	height: 48px;
	border-radius: 16px;
`
const MonitoredChannelsName = styled(Link)`
	font-weight: 700;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 200px;
`;

const ItemContent = styled.div`
  	display: flex;
	flex-direction: column;
  	gap: 4px;
`
const QuantityContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`
const MonitoredChannelsQuantity = styled.p`
	color: #6A7080;
	font-size: 14px;
	font-weight: 700;
`
const EmptyContainer = styled.div`
	margin-top: 32px;
	margin-bottom: 40px;
	padding: 0 56px;
	@media(max-width: 1600px) {
		padding: 0 32px;
	}
	@media(max-width: 768px) {
		padding: 0 24px;
	}
`

export default MonitoredChannels