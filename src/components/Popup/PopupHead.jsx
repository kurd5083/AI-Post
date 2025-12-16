import styled from "styled-components";
import ava_icon from "@/assets/ava-icon.png";
import setting from "@/assets/setting.svg";
import arrow from "@/assets/arrow.svg";
import { usePopupStore } from "@/store/popupStore"
import { popupDatas } from "@/data/popupDatas";
import CloseIcon from "@/icons/CloseIcon";

const PopupHead = () => {
	const { popup, closePopup, goBack } = usePopupStore()
	const foundItem = popupDatas.find(elem => elem.key == popup.content)
	return (
		<>
			{popup.content !== 'notifications' && popup.content !== 'replenish' && popup.content !== 'upload_media' && popup.content !== 'profile' && (
				<PopupListInfo>
					{popup.content != 'settings' && <PopupArrow src={arrow} alt="arrow icon" width={8} height={16} onClick={goBack} />}
					<PopupListAva src={ava_icon} alt="ava icon" width={48} height={48} />
					<PopupListInfoContent>
						<p>Antropia Digital</p>
						<span>14.670 Подписчиков</span>
					</PopupListInfoContent>
				</PopupListInfo>
			)}
			{popup.content !== 'profile' && (
				<PopupListHead>
					<PopupListHeadContent>
						{popup.content == 'settings' ? (
							<>
								<IconSettingsMain src={setting} alt="setting icon" width={48} height={48} />
								<h2>Настройки</h2>
							</>
						) : (
							<>
								{foundItem.extra && (
									<IconBac $bg={foundItem.extra.background}>
										{foundItem.extra.image ? (
											<IconSettings src={foundItem.extra.image} alt={`${foundItem.key} icon`} />
										) : (
											<>
												{foundItem.extra.svg}
											</>
										)}
									</IconBac>
								)}
								<PopupTitle>
									<h2>{popup.name ? popup.name : foundItem.name}</h2>
									{popup.text && <p>{popup.text}</p>}
								</PopupTitle>
							</>
						)}
					</PopupListHeadContent>
					<PopupListHeadBtn $absolute={popup.content === 'replenish' || popup.content === 'upload_media' || popup.content === 'notifications'} onClick={() => closePopup()}>
            <CloseIcon color="#336CFF"/>
						<span>Закрыть окно</span>
					</PopupListHeadBtn>
				</PopupListHead>
			)}
		</>
	)
}
const PopupListInfo = styled.section`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
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
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
  padding-bottom: 40px !important;
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
  @media(max-width: 768px) {
    h2 {
      font-size: 40px;
      line-height: 40px;
    }
	}
  @media(max-width: 480px) {
    gap: 24px;
    align-items: center;

    h2 {
      font-size: 26px;
      line-height: 26px;
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

const IconBac = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
  margin-top: 6px;
  padding: 10px;
  width: 40px;
	height: 40px;
  border-radius: 8px;
	background-color: ${({ $bg }) => $bg};
	@media(max-width: 768px) {
    margin-top: 0;
  }
`
const IconSettings = styled.img``
const PopupTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
	p {
    color: #6A7080;
    font-size: 14px;
    font-weight: 600;
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
    
	@media (max-width: 768px) {
    ${({ $absolute }) =>
		!$absolute &&
		`
        position: absolute;
        top: -88px;
        right: 24px;
      `}

    padding: 14px;

    span {
      display: none;
    }
  }
`

export default PopupHead