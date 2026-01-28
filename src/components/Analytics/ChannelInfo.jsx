import styled from "styled-components";

import BtnBase from "@/shared/BtnBase";
import СhannelPlug from '@/shared/СhannelPlug';
import Empty from "@/shared/Empty";

import { useAddSubscribeChannel } from "@/lib/channels/useAddSubscribeChannel";

const ChannelInfo = ({ channel }) => {
	const { mutate: addSubscribe, isPending: subscribePending } = useAddSubscribeChannel();

	const handleSubscribe = () => {
		addSubscribe({ channel: `@${channel.username}` });
	}
	return (
		<ChannelInfoContainer>
			<ChannelHeader>
				<СhannelPlug
					width={
						window.innerWidth < 480
							? "80px"
							: window.innerWidth < 1400
								? "104px"
								: "144px"
					}
					height={
						window.innerWidth < 480
							? "80px"
							: window.innerWidth < 1400
								? "104px"
								: "144px"
					}
					radius={window.innerWidth < 1400 ? "24px" : "32px"}
					fs={window.innerWidth < 1400 ? "24px" : "36px"}
					text={channel.title}
				/>
				<div>
					<ChannelName>{channel.title}</ChannelName>
					<ChannelUsername>@{channel.username}</ChannelUsername>
					<BtnBase
						$bg="#336CFF"
						$color="#FFFFFF"
						$padding="17px 40px"
						onClick={handleSubscribe}
						disabled={subscribePending}
					>
						{subscribePending ? "Подписка..." : "Отслеживать канал"}
					</BtnBase>
				</div>
			</ChannelHeader>
			<ChannelDescription>
				<DescriptionTitle>Описание</DescriptionTitle>
				{channel.description ? (
					<DescriptionText>{channel.description}</DescriptionText>
				) : (
					<Empty icon="📝">Добавьте описание</Empty>
				)}
			</ChannelDescription>
		</ChannelInfoContainer>
	)
}

const ChannelInfoContainer = styled.div`
	margin-top: 40px;
	display: grid;
	grid-template-columns: 1fr 1fr;
  padding: 0 56px 40px;
	gap: 40px 0;
 
  @media(max-width: 1600px) { 
    padding: 0 32px 40px 
	}	
	@media(max-width: 991px) { 
   grid-template-columns: 1fr;
	}	
  @media(max-width: 768px) { 
    padding: 0 24px 40px;
		margin-top: 32px;
  }
`
const ChannelHeader = styled.div`
	display: flex;
	gap: 40px;
	padding-right: 40px;
	@media(max-width: 480px) { 
    flex-direction: column;
		gap: 24px;
  }
`
const ChannelName = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
`
const ChannelUsername = styled.p`
	font-size: 14px;
  font-weight: 700;
	margin-bottom: 32px;
	color: #6A7080;
`
const ChannelDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 48px;
	border-left: 2px solid #2E3954;
	@media(max-width: 480px) { 
    padding-left: 32px;
  }
`
const DescriptionTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 16px;
`
const DescriptionText = styled.p`
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  color: #6A7080;
`

export default ChannelInfo