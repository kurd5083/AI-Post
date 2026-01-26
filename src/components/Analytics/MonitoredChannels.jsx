import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import ArrowIcon from "@/icons/ArrowIcon";
import users from "@/assets/users.svg";

const MonitoredChannelsData = [
	{
		name: "Antropia Design",
		q: "214"
	},
	{
		name: "Antropia Design",
		q: "214"
	},
	{
		name: "Antropia Design",
		q: "214"
	},
	{
		name: "Antropia Design",
		q: "214"
	},
	{
		name: "Antropia Design",
		q: "214"
	},
	{
		name: "Antropia Design",
		q: "214"
	},
]


const MonitoredChannels = () => {
	const [atStart, setAtStart] = useState(true);
	const [atEnd, setAtEnd] = useState(false);
	return (
		<MonitoredChannelsSwiper>
			<MonitoredChannelsButton
				disabled={atStart}
				$disabled={atStart}
				className="MonitoredChannelsButtonPrev"
			>
				<ArrowIcon color="#D6DCEC" />
			</MonitoredChannelsButton>
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
				{MonitoredChannelsData.map((item) => (
					<MonitoredChannelsItem>
						<MonitoredChannelsItemImg $bgColor="#203442" />
						<ItemContent>
							<MonitoredChannelsName to={item.name}>{item.name}</MonitoredChannelsName>
							<QuantityContainer>
								<img src={users} alt="users icon" />
								<MonitoredChannelsQuantity>{item.q}</MonitoredChannelsQuantity>
							</QuantityContainer>
						</ItemContent>

					</MonitoredChannelsItem>
				))}
			</MonitoredChannelsList>
			<MonitoredChannelsButton
				className="MonitoredChannelsButtonNext"
				disabled={atEnd}
				$disabled={atEnd}
			>
				<ArrowIcon color="#D6DCEC" />
			</MonitoredChannelsButton>
		</MonitoredChannelsSwiper>
	)
}

const MonitoredChannelsSwiper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  margin-top: 32px;
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
const MonitoredChannelsList = styled(Swiper)`
  margin: 0 48px;
  width: 100%;
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
  max-width: 265px;

  &:last-child {
    margin-right: 0 !important;
  }
`
const MonitoredChannelsItemImg = styled.div`
  background-color: ${props => props.$bgColor};
  width: 48px;
  height: 48px;
  border-radius: 16px;
`
const MonitoredChannelsName = styled(Link)`
  font-weight: 700;
`
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
const EmptyMonitoredChannels = styled.div`
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

export default MonitoredChannels
