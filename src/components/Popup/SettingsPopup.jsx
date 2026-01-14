import { useEffect, useState } from "react";
import styled from "styled-components";
import arrow from "@/assets/arrow.svg";
import bell_blue from "@/assets/popup/bell-blue.svg";
import { settingsDatas } from "@/data/settingsDatas";
import ToggleSwitch from "@/shared/ToggleSwitch";
import { usePopupStore } from "@/store/popupStore"
import { useChannelById } from "@/lib/channels/useChannelById";
import { useEnableChannelPosting, useDisableChannelPosting } from "@/lib/channels/useUpdateChannelPosting";
import { useAutoApprovalStatus } from "@/lib/channels/useAutoApprovalStatus";
import { useEnableChannelPromotion, useDisnableChannelPromotion } from "@/lib/channels/useEnableChannelPromotion";
import { usePostsByChannel } from "@/lib/posts/usePostsByChannel";
import { useUser } from "@/lib/useUser";
import { useNotificationStore } from "@/store/notificationStore";

const SettingsPopup = () => {
  const { changeContent, popup } = usePopupStore();
  const { user } = useUser();
  const channelId = popup?.data?.channelId;
  const { channel } = useChannelById(channelId);
  const { posts } = usePostsByChannel(channelId);
  const { addNotification } = useNotificationStore();
  console.log(channel)

  const [localSwitches, setLocalSwitches] = useState({
    posting: channel?.posting || false,
    activate_promotion: channel?.promotionEnabled || false,
    auto_accepting: channel?.autoApprovalEnabled || false,
  });

  useEffect(() => {
    setLocalSwitches({
      posting: channel?.posting || false,
      activate_promotion: channel?.promotionEnabled || false,
      auto_accepting: channel?.autoApprovalEnabled || false,
    });
  }, [channel]);

  const { mutate: enablePosting } = useEnableChannelPosting();
  const { mutate: disablePosting } = useDisableChannelPosting();
  const { mutate: enablePromotion } = useEnableChannelPromotion();
  const { mutate: disablePromotion } = useDisnableChannelPromotion();
  const { mutate: autoApprovalStatus } = useAutoApprovalStatus();

  const switchConfig = {
    posting: {
      checked: localSwitches.posting,
      onChange: () => {
        const next = !localSwitches.posting;
        setLocalSwitches(prev => ({ ...prev, posting: next }));

        if (next) {
          enablePosting(channelId, {
            onSuccess: () =>
              addNotification("Автопостинг включён", "update"),
            onError: (err) =>
              addNotification(err.message || "Ошибка включения автопостинга", "error"),
          });
        } else {
          disablePosting(channelId, {
            onSuccess: () =>
              addNotification("Автопостинг выключен", "update"),
            onError: (err) =>
              addNotification(err.message || "Ошибка выключения автопостинга", "error"),
          });
        }
      },
    },
    activate_promotion: {
      checked: localSwitches.activate_promotion,
      onChange: () => {
        const next = !localSwitches.activate_promotion;
        setLocalSwitches(prev => ({ ...prev, activate_promotion: next }));

        if (next) {
          enablePromotion(channelId, {
            onSuccess: () =>
              addNotification("Продвижение канала включено", "update"),
            onError: () =>
              addNotification("Ошибка включения продвижения", "error"),
          });
        } else {
          disablePromotion(channelId, {
            onSuccess: () =>
              addNotification("Продвижение канала выключено", "update"),
            onError: () =>
              addNotification("Ошибка выключения продвижения", "error"),
          });
        }
      },
    },
    auto_accepting: {
      checked: localSwitches.auto_accepting,
      onChange: () => {
        const next = !localSwitches.auto_accepting;
        setLocalSwitches(prev => ({ ...prev, auto_accepting: next }));
        autoApprovalStatus(
          { channelId, autoApprovalEnabled: next },
          {
            onSuccess: () =>
              addNotification(
                next ? "Автопринятие постов включено" : "Автопринятие постов выключено", "update"
              ),
            onError: () =>
              addNotification("Ошибка изменения автопринятия", "error"),
          }
        );
      },
    },
  };

  return (
    <SettingsContainer>
      {settingsDatas.sections.map((section) => (
        <PopupNav key={section.key}>
          <PopupContentTitle>{section.label}</PopupContentTitle>
          <ul>
            {section.items.map((item, index) => (
              <PopupContentItem
                key={index}
                onClick={item.right !== 'switch' ? () => {
                  if (!channel || !user) return;
                  changeContent(item.key, 'popup', {
                    channelId: channel.id,
                    workMode: channel.workMode,
                    premoderationMinutes: channel.premoderationMinutes,
                    canPublishWithoutApproval: channel.canPublishWithoutApproval,
                    telegramId: user.telegramId,
                  });
                } : undefined}
              >
                <PopupContentLeft>
                  {item.extra && (
                    <IconBac $bg={item.extra.background}>
                      {item.extra.image ? (
                        <img src={item.extra.image} alt={item.name} />
                      ) : (
                        <>
                          {item.extra.svg}
                        </>
                      )}
                    </IconBac>
                  )}
                  <PopupContentInfo $size={item.size} $publications={item.key}>
                    <h3>{item.name}</h3>
                    {item.status && (
                      <span>
                        {switchConfig[item.key]?.checked ? 'Включено' : 'Выключено'}
                      </span>
                    )}
                  </PopupContentInfo>
                </PopupContentLeft>
                {item.right == 'arrow' ? (
                  <img src={arrow} alt="arrow icon" height={12} width={6} />
                ) : item.right == 'switch' ? (
                  <ToggleSwitch
                    bg="#FF9C55"
                    checked={switchConfig[item.key]?.checked || false}
                    onChange={switchConfig[item.key]?.onChange}
                  />
                ) : item.right == 'textarrow' ? (
                  <PopupContentRight>
                    {item.key == 'mode' ? (
                      <ContentRightColumn>
                        <span>{channel?.workMode === "PREMODERATION" && "Предмодерация"}</span>
                        <span>{channel?.workMode === "AUTOPOSTING" && "Автопостинг"}</span>
                      </ContentRightColumn>
                    ) : item.key == 'filtering' ? (
                      <ContentRightColumn>
                        <span>Ключевые слова: {channel?.keywords?.join(', ')}</span>
                        <span>Стоп-слова: {channel?.stopWords?.join(', ')}</span>
                      </ContentRightColumn>
                    ) : item.key == 'sources' ? (
                      <ContentRightColumn>
                        <ContentRightColumn>
                          <span>
                            {channel?.sources?.map((source, index) => (
                              <>{source.name}{index < channel.sources.length - 1 ? ', ' : ''}</>
                            ))}
                          </span>
                        </ContentRightColumn>
                      </ContentRightColumn>
                    ) : (
                      2
                    )}
                    <img src={arrow} alt="arrow icon" height={12} width={6} />
                  </PopupContentRight>
                ) : item.right == 'imgarrow' ? (
                  <PopupContentRight>
                    <img src={bell_blue} alt="bell icon" height={24} width={20} />
                    <img src={arrow} alt="arrow icon" height={12} width={6} />
                  </PopupContentRight>
                ) : (
                  <PopupContentCounter>{posts?.length || 0}</PopupContentCounter>
                )}
              </PopupContentItem>
            ))}
          </ul>
        </PopupNav>
      ))}
    </SettingsContainer>
  )
}
const SettingsContainer = styled.div`
  padding: 0 56px 30px;
  @media(max-width: 1600px) {
    padding: 0 32px 30px;
  }
  @media(max-width: 768px) {
    padding: 0 24px 30px;
  }
`
const PopupNav = styled.nav`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 33px;
  &:first-child {
    margin-top: 0;
  }
`
const PopupContentTitle = styled.h2`
  color: #6A7080;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
`
const PopupContentItem = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  padding: 24px 0;
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
const PopupContentLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 24px ;
  img {
    box-sizing: border-box;
    border-radius: 8px;
    padding: 8px;
  }
`
const IconBac = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
  padding: 10px;
  width: 40px;
	height: 40px;
  border-radius: 8px;
	background-color: ${({ $bg }) => $bg};
`
const PopupContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
    
  h3 {
    font-weight: 700;   
    font-size: ${props => props.$size ? '24px' : '16px'};
  }

  span {
    color: #6A7080;
    font-size:  12px;
    font-weight: 700;
    text-transform: uppercase;

    @media(max-width: 480px) {
      display: ${props => props.$publications == "publications" ? 'none' : 'block'};
    }
  }
`
const PopupContentRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`
const ContentRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  text-align: right;
`
const PopupContentCounter = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border: 2px solid #1F273B;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
`

export default SettingsPopup