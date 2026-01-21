import styled from "styled-components";

import BtnBase from "@/shared/BtnBase";

const ChannelInfo = () => {
	return (
		<ChannelInfoContainer>
			<ChannelHeader>
				<ChannelAvatar src="" alt="" />
				<div>
					<ChannelName>Antropia Gaming</ChannelName>
					<ChannelUsername>@antropia_gaming</ChannelUsername>

					<BtnBase $bg="#336CFF" $color="#FFFFFF" $padding="17px 40px">Отслеживать канал</BtnBase>
				</div>
			</ChannelHeader>
			<ChannelDescription>
				<DescriptionTitle>Описание</DescriptionTitle>
				<DescriptionText>
					Канал об дизайне, трендах и реализации самых заветных идей, а также, внутрянка кухни.
					<br/><br/>
					Подписывайтесь и отслеживайте канал!
				</DescriptionText>
			</ChannelDescription>
		</ChannelInfoContainer>
	)
}

const ChannelInfoContainer = styled.div`
	margin-top: 40px;
	display: grid;
	grid-template-columns: 1fr 1fr;
  padding: 0 56px 40px;

  @media(max-width: 1600px) { 
    padding: 0 32px 40px 
	}	
  @media(max-width: 768px) { 
    padding: 0 24px 40px
  }
`
const ChannelHeader = styled.div`
	display: flex;
	align-items: center;
	gap: 40px;
	border-right: 2px solid #2E3954;
	padding-right: 40px;
`
const ChannelAvatar = styled.img`
  width: 144px;
  height: 144px;
  border-radius: 32px;
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