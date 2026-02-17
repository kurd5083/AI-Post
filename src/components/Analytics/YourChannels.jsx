import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import ArrowIcon from "@/icons/ArrowIcon";
import users from "@/assets/users.svg";

import СhannelPlug from '@/shared/СhannelPlug';
import HighlightText from "@/shared/HighlightText";
import Empty from "@/shared/Empty";

import { useUserChannels } from "@/lib/channels/useUserChannels";

const YourChannels = ({ debouncedQuery, viewMode }) => {
	const [atStart, setAtStart] = useState(true);
	const [atEnd, setAtEnd] = useState(false);
	const { userChannels, userPending } = useUserChannels();

	const filteredChannels = userChannels?.filter((item) => {
		if (!debouncedQuery.trim()) return true;

		const q = debouncedQuery.toLowerCase().trim();
		return item.name.toLowerCase().includes(q)
	});

	return (
		<>
			{userPending ? (
				<EmptyContainer>
					<Empty icon="📢">Загрузка каналов...</Empty>
				</EmptyContainer>
			) : (
				filteredChannels?.length === 0 ? (
					<EmptyContainer>
						<Empty icon="📢">Нет каналов</Empty>
					</EmptyContainer>
				) : (
					<YourChannelsSwiper $padding={viewMode == 'List'}>
						{viewMode === 'List' ? (
							<YourChannelsList>
								{filteredChannels?.map((item) => (
									<ListItem>
										<СhannelPlug width="48px" height="48px" text={item.name} />
										<ItemContainer>
											<ListName to={`/analytics/${item.id}`}>
												<HighlightText text={item.name} query={debouncedQuery}>{item.name}</HighlightText>
											</ListName>
											<ListContainer>
												<img src={users} alt="users icon" />
												<ListQuantity>{item.subscribersCount}</ListQuantity>
											</ListContainer>
										</ItemContainer>
										<GoOver to={`/analytics/${item.id}`}>Перейти</GoOver>
									</ListItem>
								))}
							</YourChannelsList>
						) : (
							<>
								<YourChannelsButton
									disabled={atStart}
									$disabled={atStart}
									className="YourChannelsButtonPrev"
								>
									<ArrowIcon color="#D6DCEC" />
								</YourChannelsButton>
								<YourChannelsTape
									spaceBetween={8}
									slidesPerView="auto"
									allowTouchMove={true}
									modules={[Navigation]}
									navigation={{
										nextEl: ".YourChannelsButtonNext",
										prevEl: ".YourChannelsButtonPrev",
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
									{filteredChannels.map((item) => (
										<TapeItem>
											<СhannelPlug width="48px" height="48px" text={item.name} />
											<TapeName to={`/analytics/${item.id}`}>
												<HighlightText text={item.name} query={debouncedQuery}>{item.name}</HighlightText>
											</TapeName>
											<TapeContainer>
												<img src={users} alt="users icon" />
												<TapeQuantity>{item.subscribersCount}</TapeQuantity>

											</TapeContainer>
										</TapeItem>
									))}
								</YourChannelsTape>
								<YourChannelsButton
									className="YourChannelsButtonNext"
									disabled={atEnd}
									$disabled={atEnd}
								>
									<ArrowIcon color="#D6DCEC" />
								</YourChannelsButton>
							</>
						)}
					</YourChannelsSwiper>
				)
			)}
		</>
	)
}
const YourChannelsSwiper = styled.div`
	position: relative;
  	display: flex;
	align-items: center;
	margin-top: 32px;
	margin-bottom: 40px;
	padding: 0 56px;

  @media(max-width: 1600px) { 
    padding: 0 32px 
	}	
	@media(max-width: 1400px) { 
    padding: ${({ $padding }) => $padding ? '0 24px' : 0};
	}	
	@media(max-width: 768px) { 
    margin-bottom: 90px;
  }
`
const YourChannelsButton = styled.button`
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
		top: -80px;
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
const YourChannelsTape = styled(Swiper)`
  	margin: 0 48px;
	width: 100%;

	@media (max-width: 1400px) {
		padding: 0 32px;
		margin: 0;
	}
	@media(max-width: 768px) { 
		padding: 0 24px
	}
`
const TapeItem = styled(SwiperSlide)`
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	padding: 24px;
	border-radius: 24px;
	background-color: #1C2438;
	height: 170px;
	max-width: 265px;

  &:last-child {
    margin-right: 0 !important;
  }
	`
const TapeName = styled(Link)`
	margin-top: 24px;
	margin-bottom: 16px;
	font-weight: 700;
`
const TapeContainer = styled.div`
  	display: flex;
	align-items: center;
	gap: 10px;
`
const TapeQuantity = styled.p`
	color: #6A7080;
	font-size: 14px;
	font-weight: 700;
`
const YourChannelsList = styled.div`
	display: grid;
	gap: 24px 80px;
	grid-template-columns: repeat(3, 1fr);
	width: 100%;

	@media (max-width: 1200px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
`
const ListItem = styled.div`
	display: flex;
	align-items: center;
	gap: 24px;
	justify-content: space-between;
	border-top: 2px solid #333E59;
	padding-top: 24px; 
	
	&:nth-child(-n+3) {
		border: none;
		padding: 0;
	}

	@media (max-width: 1200px) {
		&:nth-child(n+3) {
			border-top: 2px solid #333E59;
			padding-top: 24px;
		}
	}
	@media (max-width: 768px) {
		&:nth-child(n+2) {
			border-top: 2px solid #333E59;
			padding-top: 24px;
		}
	}
`
const ItemContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`
const ListName = styled(Link)`
	margin-bottom: 8px;
  	font-weight: 700;
`
const ListContainer = styled.div`
  	display: flex;
	align-items: center;
	gap: 10px;
`
const ListQuantity = styled.p`
 	color: #6A7080;
	font-size: 14px;
	font-weight: 700;
`
const GoOver = styled(Link)`
	color: #336CFF;
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

export default YourChannels