import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import ArrowIcon from "@/icons/ArrowIcon";
import users from "@/assets/users.svg";

import { slugchange } from "../../lib/slugchange";

const YourChannelsData = [
	{
		name: "Antropia Design",
		q: "5.092.302"
	},
	{
		name: "Antropia Design",
		q: "5.092.302"
	},
	{
		name: "Antropia Design",
		q: "5.092.302"
	},
	{
		name: "Antropia Design",
		q: "5.092.302"
	},
	{
		name: "Antropia Design",
		q: "5.092.302"
	},
	{
		name: "Antropia Design",
		q: "5.092.302"
	},
]


const YourChannels = () => {
	const [atStart, setAtStart] = useState(true);
	const [atEnd, setAtEnd] = useState(false);
	return (
		<YourChannelsSwiper>
			<YourChannelsButton
				disabled={atStart}
				$disabled={atStart}
				className="YourChannelsButtonPrev"
			>
				<ArrowIcon color="#D6DCEC" />
			</YourChannelsButton>
			<YourChannelsList
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
					<YourChannelsItem>
						<YourChannelsItemImg $bgColor="#203442">
						</YourChannelsItemImg>
						<YourChannelsName to={slugchange(item.name)}>{item.name}</YourChannelsName>
						<QuantityContainer>
							<img src={users} alt="users icon" />
							<YourChannelsQuantity>{item.q}</YourChannelsQuantity>

						</QuantityContainer>
					</YourChannelsItem>
				))}

			</YourChannelsList>
			<YourChannelsButton
				className="YourChannelsButtonNext"
				disabled={atEnd}
				$disabled={atEnd}
			>
				<ArrowIcon color="#D6DCEC" />
			</YourChannelsButton>
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
const YourChannelsList = styled(Swiper)`
  margin: 0 48px;
	width: 100%;
`
const YourChannelsItem = styled(SwiperSlide)`
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

const YourChannelsItemImg = styled.div`
  background-color: ${props => props.$bgColor};
  width: 48px;
  height: 48px;
  border-radius: 16px;
	margin-bottom: 24px;
`
const YourChannelsName = styled(Link)`
  margin-bottom: 16px;
  font-weight: 700;
`
const QuantityContainer = styled.div`
  display: flex;
	align-items: center;
	gap: 10px;
`
const YourChannelsQuantity = styled.p`
  color: #6A7080;
  font-size: 14px;
  font-weight: 700;
`

const EmptyYourChannels = styled.div`
  box-sizing: border-box;
  text-align: center;
  color: #6A7080;
  padding: 48px 0;
  font-weight: 600;
  background-color: #1C2438;
  border-radius: 16px;
  margin-top: 32px;
  @media (max-width: 1400px) {
    margin: 32px 32px 0;
  }
  @media (max-width: 768px) {
    margin: 32px 24px;
  }
`;

export default YourChannels
