import styled from "styled-components";
import setting from "@/assets/setting.svg";
import ArrowIcon from "@/icons/ArrowIcon";
import { usePopupStore } from "@/store/popupStore"
import { popupDatas } from "@/data/popupDatas";
import CloseIcon from "@/icons/CloseIcon";
import { useChannelById } from "@/lib/channels/useChannelById";
import СhannelPlug from "@/shared/СhannelPlug";

const PopupHead = () => {
  const { popup, closePopup, goBack } = usePopupStore()
  const channelId = popup?.data?.channelId;
  const foundItem = popupDatas.find(elem => elem.key == popup.content)
  const { channel } = useChannelById(channelId);

  return (
    <>
      {popup.content !== 'notifications' && popup.content !== 'replenish' && popup.content !== 'upload_media' && popup.content !== 'profile' && popup.content !== 'create_post' && (
        <PopupListInfo>
          {popup.content != 'settings' && popup.previousPage?.length !== 0 && 
          <PopupArrow onClick={goBack}> 
            <ArrowIcon width={8} height={16}/>
          </PopupArrow>
          }
          {channel?.avatarUrl ? (
            <PopupListAva src={channel?.avatarUrl} alt="ava icon" width={48} height={48} />
          ) : (
            <СhannelPlug width="48px" height="48px" text={channel?.name || "U"} />
          )}
          <PopupListInfoContent>
            <p>{channel?.name || "Имя канала..."}</p>
            <span>{channel?.subscribersCount || 0} Подписчиков</span>
          </PopupListInfoContent>
        </PopupListInfo>
      )}
      {popup.content !== 'profile' && popup.content !== 'create_post' && (
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
                  <h2>{popup.content !== 'compilation_upload' ? (popup.name || foundItem.name) : popup.data.name}</h2>
                  {(popup.content !== 'compilation_upload' ? popup.text : popup.data.text) && (
                    <p>{popup.content !== 'compilation_upload' ? popup.text : popup.data.text}</p>
                  )}
                </PopupTitle>
              </>
            )}
          </PopupListHeadContent>
          <PopupListHeadBtn $absolute={popup.content === 'replenish' || popup.content === 'upload_media' || popup.content === 'notifications'} onClick={() => closePopup()}>
            <CloseIcon color="#336CFF" />
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
const PopupArrow = styled.div`
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