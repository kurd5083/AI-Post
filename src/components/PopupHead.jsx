import styled from "styled-components";
import ava_icon from "@/assets/ava-icon.png";
import setting from "@/assets/setting.svg";
import arrow from "@/assets/arrow.svg";
import close from "@/assets/popup/close.svg";
import { usePopupStore } from "@/store/popupStore"
import { data } from "@/data/data";

const PopupHead = () => {
    const { popup, closePopup } = usePopupStore()
    const foundItem = data.find(elem => elem.key == popup.content)
    return (
        <>
            <PopupListInfo>
                {popup.content != 'settings' && <PopupArrow src={arrow} alt="arrow icon" width={8} height={16} />}
                <PopupListAva src={ava_icon} alt="ava icon" width={48} height={48} />
                <PopupListInfoContent>
                    <p>Antropia Digital</p>
                    <span>14.670 Подписчиков</span>
                </PopupListInfoContent>
            </PopupListInfo>
            <PopupListHead>
                <PopupListHeadContent>
                    {popup.content == 'settings' ? (
                        <>
                            <img src={setting} alt="setting icon" width={48} height={48} />
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
                    Закрыть окно
                </PopupListHeadBtn>
            </PopupListHead>
        </>
    )
}
const PopupListInfo = styled.section`
    display: flex;
    align-items: center;
    gap: 24px;
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
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding-bottom: 40px;
`
const PopupListHeadContent = styled.div`
    margin-top: 40px;
    display: flex;
    align-items: center;
    gap: 40px;
    h2 {
        font-size: 48px;
        line-height: 48px;
        font-weight: 700;
    }

`
const IconSettings = styled.img`
    box-sizing: border-box;
    border-radius: 8px;
    padding: 11px 10px;
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
`

export default PopupHead
