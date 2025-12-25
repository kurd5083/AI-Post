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

const SettingsPopup = () => {
  const { changeContent, popup } = usePopupStore();
  const channelId = popup?.data?.channelId;
  const channelName = popup?.data?.channelName;
  const { channel } = useChannelById(channelId);
  const { posts } = usePostsByChannel(channelId);

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
        setLocalSwitches(prev => ({ ...prev, posting: !prev.posting }));
        if (!localSwitches.posting) enablePosting(channelId);
        else disablePosting(channelId);
      },
    },
    activate_promotion: {
      checked: localSwitches.activate_promotion,
      onChange: () => {
        setLocalSwitches(prev => ({ ...prev, activate_promotion: !prev.activate_promotion }));
        if (!localSwitches.activate_promotion) enablePromotion(channelId);
        else disablePromotion(channelId);
      },
    },
    auto_accepting: {
      checked: localSwitches.auto_accepting,
      onChange: () => {
        setLocalSwitches(prev => ({ ...prev, auto_accepting: !prev.auto_accepting }));
        autoApprovalStatus({ channelId, autoApprovalEnabled: !localSwitches.auto_accepting });
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
              <PopupContentItem key={index} onClick={item.right !== 'switch' ? () => changeContent(item.key, { channelId: channelId, channelName: channelName, workMode: channel?.workMode }) : undefined}>
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
                    <span>
                      {channel?.workMode === "PREMODERATION" && "Предмодерация"}
                      {channel?.workMode === "AUTOPOSTING" && "Автопостинг"}
                    </span>
                    <img src={arrow} alt="arrow icon" height={12} width={6} />
                  </PopupContentRight>
                ) : item.right == 'imgarrow' ? (
                  <PopupContentRight>
                    <img src={bell_blue} alt="bell icon" height={24} width={20} />
                    <img src={arrow} alt="arrow icon" height={12} width={6} />
                  </PopupContentRight>
                ) : (
                  <PopupContentCounter>{posts?.length} || 0</PopupContentCounter>
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
  padding: 0 56px;
  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
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