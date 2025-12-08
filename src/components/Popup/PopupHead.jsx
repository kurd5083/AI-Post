import styled from "styled-components";
import ava_icon from "@/assets/ava-icon.png";
import setting from "@/assets/setting.svg";
import arrow from "@/assets/arrow.svg";
import close from "@/assets/popup/close.svg";
import { usePopupStore } from "@/store/popupStore"
import { popupdata } from "@/data/popupdata";

const PopupHead = () => {
    const { popup, closePopup, goBack  } = usePopupStore()
    const foundItem = popupdata.find(elem => elem.key == popup.content)
    return (
        <>
            {popup.content !== 'notifications' && (
                <PopupListInfo>
                    {popup.content != 'settings' && <PopupArrow src={arrow} alt="arrow icon" width={8} height={16} onClick={goBack}/>}
                    <PopupListAva src={ava_icon} alt="ava icon" width={48} height={48} />
                    <PopupListInfoContent>
                        <p>Antropia Digital</p>
                        <span>14.670 Подписчиков</span>
                    </PopupListInfoContent>
                </PopupListInfo>
            )}
            
            <PopupListHead>
                <PopupListHeadContent>
                    {popup.content == 'settings' ? (
                        <>
                            <IconSettingsMain src={setting} alt="setting icon" width={48} height={48} />
                            <h2>Настройки</h2>
                        </>
                    ) : (
                        <>
                            <IconSettings src={foundItem.extra.image} alt={`${foundItem.key} icon`} width={40} height={40} style={{ background: foundItem.extra.background }} />
                            <h2>{foundItem.name}</h2>
                        </>
                    )}
                </PopupListHeadContent>
                <PopupListHeadBtn onClick={() => closePopup()}>
                    <img src={close} alt="close icon" />
                    <span>Закрыть окно</span>
                </PopupListHeadBtn>
            </PopupListHead>
        </>
    )
}
const PopupListInfo = styled.section`
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 40px;
`
const PopupArrow = styled.img`
    transform: rotate(180deg);
    cursor: pointer;
`

const PopupListAva = styled.img`
    border-radius: 50%;
`
const PopupListInfoContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    p {
        font-weight: 700;
        line-height: 16px;
    }
    span {
        font-size: 12px;
        color: #6A7080;
        font-weight: 700;
        line-height: 12px;
    }
`
const PopupListHead = styled.section`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    padding-bottom: 40px;
`
const PopupListHeadContent = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 40px;
    h2 {
        font-size: 48px;
        line-height: 48px;
        font-weight: 700;
    }

    @media(max-width: 480px) {
        gap: 24px;
        h2 {
            font-size: 32px;
            line-height: 32px;
        }
    }
`
const IconSettingsMain = styled.img`
    @media(max-width: 480px) {
        width: 24px;
        height: 24px;
        margin-top: 4px;
    }
`
const IconSettings = styled.img`
    box-sizing: border-box;
    border-radius: 8px;
    padding: 10px;
    margin-top: 6px;
    @media(max-width: 480px) {
        margin-top: 0;
    }
`

const PopupListHeadBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 16px;
    color: #D6DCEC;
    font-size: 14px;
    font-weight: 700;
    border: 2px solid #333E59;
    border-radius: 12px;
    padding: 15px 24px;
    flex-shrink: 0;
    @media(max-width: 768px) {
        top: 20px;
        right: 32px;
        position: absolute;
        padding: 14px;
        span {
            display: none;
        }
    }
`

export default PopupHead
