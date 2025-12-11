import styled from "styled-components";
import { notificationsData } from "@/data/notificationsData";
import { usePopupStore } from "@/store/popupStore"

const NotificationsPopup = () => {
    const { changeContent } = usePopupStore()
    return (
        <NotificationsContainer>
            {notificationsData.map((item, index) => (
                <NotificationsContent key={index}>
                    <NotificationsImg src={item.extra.image} alt={item.title} width={16} height={16} style={{ background: item.extra.background }} />
                    <NotificationsText>
                        <h4>{item.title}</h4>
                    </NotificationsText>
                </NotificationsContent>
            ))}
        </NotificationsContainer>
    );
};

const NotificationsContainer = styled.div`
`

const NotificationsContent = styled.div`
    display: flex;
    align-items: center;
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
const NotificationsImg = styled.img`
    box-sizing: content-box;
    padding: 12px;
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
