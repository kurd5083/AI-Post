import styled from "styled-components";
import arrow from "@/assets/arrow.svg";
import TimeIcons from "@/icons/TimeIcons";

const CardPablish = ({ item, bg }) => {
	return (
		<CardPablishItem $bg={bg}>
			<CardPablishItemHead>
				<CardPablishItemName>
					<CardPablishItemImg src={item.ava} alt={item.username} />
					<p>{item.username}</p>
				</CardPablishItemName>
				<CardPablishItemTime>
          <TimeIcons/>
					{item.time}
				</CardPablishItemTime>
			</CardPablishItemHead>
			<CardPablishText>{item.text}</CardPablishText>
			<CardPablishSubtext>{item.subtext}</CardPablishSubtext>
			<CardPablishOpen>
				<img src={arrow} alt="arrow icon" />
			</CardPablishOpen>
		</CardPablishItem>
	)
}
const CardPablishOpen = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  border: 2px solid #1C2438;
`

const CardPablishItem = styled.div`
  position: relative; 
  box-sizing: border-box;
  padding: 20px;
  border: 2px solid ${({ $bg }) => $bg ? '#181F30' : '#1F273B'};
  border-radius: 24px;
  background-color: ${({ $bg }) => $bg ? '#181F30' : 'transporent'};

  &:hover {
    background-color: #181F30;
    border: 2px solid #181F30;
    ${CardPablishOpen} {
      background-color: #1C2438;
      
			svg path {
        stroke: #D6DCEC; 
      }
    }
  }
`
const CardPablishItemHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const CardPablishItemName = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
    
  p {
    max-width: 100px;         
    white-space: nowrap;  
    overflow: hidden;     
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 700;
  }
`
const CardPablishItemImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`
const CardPablishItemTime = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
`
const CardPablishText = styled.p`
  box-sizing: border-box;
  margin-top: 26px;
  font-size: 24px;
  line-height: 24px;
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-right: 40px;
`
const CardPablishSubtext = styled.p`
  box-sizing: border-box;
  margin-top: 16px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  color: #6A7080;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 60px;
`

export default CardPablish