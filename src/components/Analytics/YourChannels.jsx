import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import ArrowIcon from "@/icons/ArrowIcon";
import users from "@/assets/users.svg";

import { slugchange } from "@/lib/slugchange";

const YourChannelsData = [
	{ name: "Antropia Design", q: "5.092.302" },
	{ name: "Antropia Design", q: "5.092.302" },
	{ name: "Antropia Design", q: "5.092.302" },
	{ name: "Antropia Design", q: "5.092.302" },
	{ name: "Antropia Design", q: "5.092.302" },
	{ name: "Antropia Design", q: "5.092.302" },
]

const YourChannels = ({ viewMode }) => {
	const [atStart, setAtStart] = useState(true);
	const [atEnd, setAtEnd] = useState(false);

	return (
		<YourChannelsSwiper>
			{viewMode === 'List' ? (
				<YourChannelsList
				>
					{YourChannelsData.map((item) => (
						<ListItem>
							<ListItemImg $bgColor="#203442"></ListItemImg>
							<ItemContainer>
								<ListName to={slugchange(item.name)}>{item.name}</ListName>
								<ListContainer>
									<img src={users} alt="users icon" />
									<ListQuantity>{item.q}</ListQuantity>
								</ListContainer>
							</ItemContainer>
							<GoOver to={slugchange(item.name)}>Перейти</GoOver>
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
						{YourChannelsData.map((item) => (
							<TapeItem>
								<TapeItemImg $bgColor="#203442"></TapeItemImg>
								<TapeName to={slugchange(item.name)}>{item.name}</TapeName>
								<TapeContainer>
									<img src={users} alt="users icon" />
									<TapeQuantity>{item.q}</TapeQuantity>

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
}
const YourChannelsSwiper = styled.div`
  display: flex;
	align-items: center;
 	margin-bottom: 40px;
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

	@media (max-width: 768px) {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(10px);
    width: 32px;
    height: 32px;
    z-index: 2;
  }
  @media (max-width: 640px) {
    transform: translateY(30px);
  }
  &:first-child {
    transform: rotate(180deg);
    @media (max-width: 768px) {
      transform: rotate(180deg) translateY(-10px);
      left: 16px;
    }
    @media (max-width: 640px) {
      transform: rotate(180deg) translateY(-30px);
    }
  }
`
const YourChannelsTape = styled(Swiper)`
  margin: 0 48px;
	width: 100%;
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
const TapeItemImg = styled.div`
  background-color: ${props => props.$bgColor};
  width: 48px;
  height: 48px;
  border-radius: 16px;
	margin-bottom: 24px;
`
const TapeName = styled(Link)`
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
const ListItemImg = styled.div`
	background-color: ${props => props.$bgColor};
  width: 48px;
  height: 48px;
  border-radius: 16px;
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

export default YourChannels