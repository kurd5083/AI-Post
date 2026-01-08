import styled from "styled-components";
import { notificationsDatas } from "@/data/notificationsDatas";
import CloseIcon from "@/icons/CloseIcon";

const NotificationsPopup = () => {
  return (
    <NotificationsContainer>
      {notificationsDatas.map((item, index) => (
        <NotificationsContent key={index}>
          <NotificationsLeft>
            <ImageBac $bg={item.extra.background}>
              {item.extra.image ? (
                <img src={item.extra.image} alt={item.title} width={16} height={16}/>
              ) : (
                <>{item.extra.svg}</>
              )}
            </ImageBac>
            <NotificationsText>
              <h4>{item.title}</h4>
            </NotificationsText>
          </NotificationsLeft>
          <CloseIcon/>
        </NotificationsContent>
      ))}
    </NotificationsContainer>
  );
};

const NotificationsContainer = styled.div`
  padding: 0 56px 30px;

  @media(max-width: 1600px) {
    padding: 0 32px 30px;
  }
  @media(max-width: 768px) {
    padding: 0 24px 30px;
  }
`
const NotificationsContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 32px 0;
  border-bottom: 2px solid #2E3954;
  cursor: pointer;

  &:first-child {
    padding-top: 0;
  }
    
  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }
`
const NotificationsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`
const ImageBac = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({$bg}) => $bg};
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 8px;
`
const NotificationsText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h4 {
    font-size: 16px;
    font-weight: 700;
  }
`

export default NotificationsPopup