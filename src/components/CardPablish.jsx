import styled from "styled-components";
import TimeIcons from "@/icons/TimeIcons";
import timeAgo from "@/lib/timeAgo";
import BtnBase from "@/shared/BtnBase";
import { useLightboxStore } from "@/store/lightboxStore";

const CardPablish = ({ item, bg }) => {
  const { openLightbox } = useLightboxStore();

  console.log(item)
  return (
    <CardPablishItem $bg={bg}>
      <CardPablishItemHead>
        <CardPablishItemName>
          <CardPablishItemImg src={item.ava} alt={item.username} />
          <p>{item.username}</p>
        </CardPablishItemName>
        <CardPablishItemTime>
          <p>{new Date(item.createdAt).toLocaleDateString("ru-RU")}</p><br />
          <span>
            {new Date(item.createdAt).toLocaleTimeString("ru-RU", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </CardPablishItemTime>
      </CardPablishItemHead>
      <CardPablishImages>
        {item.images.map((elem, index) => (
          <ImageItem
            src={elem}
            alt={`картинка поста ${index}`}
            onClick={() => openLightbox({
              images: item.images.map(img => img),
              initialIndex: 0
            })}
          />
        ))}
      </CardPablishImages>
      <CardPablishText>{item.title}</CardPablishText>
      <CardPablishSubtext>{item.summary}</CardPablishSubtext>
      <CardPablishButtons>
        <BtnBase
          $padding="16px 24px"
          $width="100%"
          $bg="transporent"
          $color="#D6DCEC"
          $border={true}
        >
          Принять
        </BtnBase>
        <BtnBase
          $padding="16px 24px"
          $width="100%"
          $bg="transporent"
          $color="#D6DCEC"
          $border={true}
        >
          Отклонить
        </BtnBase>
      </CardPablishButtons>
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
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
  span {
  color:#6A7080;

  }
`
const CardPablishImages = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`
const ImageItem = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
`
const CardPablishText = styled.p`
  box-sizing: border-box;
  margin-top: 18px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
const CardPablishSubtext = styled.p`
  box-sizing: border-box;
  margin-top: 16px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  color: #6A7080;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
const CardPablishButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
`

export default CardPablish