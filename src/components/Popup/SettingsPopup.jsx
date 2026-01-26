import { useEffect, useState, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import ArrowIcon from "@/icons/ArrowIcon";
import { settingsDatas } from "@/data/settingsDatas";
import ToggleSwitch from "@/shared/ToggleSwitch";
import { usePopupStore } from "@/store/popupStore"
import { useChannelById } from "@/lib/channels/useChannelById";
import { useEnableChannelPosting, useDisableChannelPosting } from "@/lib/channels/useUpdateChannelPosting";
import { useAutoApprovalStatus } from "@/lib/channels/useAutoApprovalStatus";
import { useEnableChannelPromotion, useDisnableChannelPromotion } from "@/lib/channels/useEnableChannelPromotion";
import { usePostsByChannel } from "@/lib/posts/usePostsByChannel";
import { useUser } from "@/lib/user/useUser";
import { useNotificationStore } from "@/store/notificationStore";
import { useGetChannelImagePreset } from "@/lib/channels/image-generation/useGetChannelImagePreset";
import { usePromptLibrary } from "@/lib/channels/usePromptLibrary";
import { useChannelGlobalPrompt } from "@/lib/channels/global-prompt/useChannelGlobalPrompt";
import { useChannelScheduleStatus } from "@/lib/channels/schedule/useChannelScheduleStatus";
import { useChannelSchedule } from "@/lib/channels/schedule/useChannelSchedule";

import { useChannelInterval } from "@/lib/channels/useChannelInterval";
import { useCalendarEventsByRange } from "@/lib/calendar/useCalendarEventsByRange";

const DAYS = [
  { label: "Пн", value: "MONDAY" },
  { label: "Вт", value: "TUESDAY" },
  { label: "Ср", value: "WEDNESDAY" },
  { label: "Чт", value: "THURSDAY" },
  { label: "Пт", value: "FRIDAY" },
  { label: "Сб", value: "SATURDAY" },
  { label: "Вс", value: "SUNDAY" },
];

const SettingsPopup = () => {
  const { changeContent, popup } = usePopupStore();
  const { user } = useUser();
  const channelId = popup?.data?.channelId;
  const { channel } = useChannelById(channelId);
  const { posts } = usePostsByChannel({channelId});
  const { imageChannelPreset } = useGetChannelImagePreset(channelId);
  const { promptLibrary } = usePromptLibrary();
  const { globalPrompt } = useChannelGlobalPrompt(channelId);
  const { scheduleStatus } = useChannelScheduleStatus(channelId);
  const { channelSchedule } = useChannelSchedule(channelId);
  const { channelInterval } = useChannelInterval(channelId);
  const today = new Date();

  const startISO = new Date(Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
    0, 0, 0, 0
  )).toISOString();

  const endISO = new Date(Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
    23, 59, 59, 999
  )).toISOString();

  const { events } = useCalendarEventsByRange(startISO, endISO);
  const filteredEvents = useMemo(
    () => events?.filter(e => e.channelId === channelId) || [],
    [events, channelId]
  );
  const { addNotification } = useNotificationStore();

  const [localSwitches, setLocalSwitches] = useState({
    posting: channel?.posting || false,
    activate_promotion: channel?.promotionEnabled || false,
    auto_accepting: channel?.autoApprovalEnabled || false,
  });

  const scheduleSettings = useMemo(() => {
    if (!scheduleStatus?.scheduleEnabled) {
      return "Расписание выключено";
    }

    const days =
      channelSchedule?.postDays
        ?.map(day => DAYS.find(d => d.value === day)?.label)
        ?.join(", ") || "";

    const times =
      channelSchedule?.publicationTimes?.join(", ") || "";

    return `${days} • ${times}`;
  }, [scheduleStatus, channelSchedule]);

  const localPrompt = useMemo(() => {
    if (!globalPrompt || !promptLibrary) return "";

    const found = promptLibrary.find(
      item => item.prompt === globalPrompt.globalPromt
    );

    return found ? found.title : "Пользовательский стиль";
  }, [globalPrompt, promptLibrary]);
  

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
                  <ArrowIcon height={12} width={6}/>
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
                      <ContentRightColumn style={{ minWidth: "300px" }}>
                        <span>Ключевые слова: {channel?.keywords?.join(', ')}</span>
                        <span>Стоп-слова: {channel?.stopWords?.join(', ')}</span>
                      </ContentRightColumn>
                    ) : item.key == 'sources' ? (
                      <ContentRightColumn>
                        <span>
                          {channel?.sources?.map((source, index) => (
                            <>{source.name}{index < channel.sources.length - 1 ? ', ' : ''}</>
                          ))}
                        </span>
                      </ContentRightColumn>
                    ) : item.key == 'image_generation' ? (
                      <ContentRightColumn>
                        <span>{imageChannelPreset?.name}</span>
                      </ContentRightColumn>
                    ) : item.key == 'post_style' ? (
                      <ContentRightColumn>
                        <span>{localPrompt}</span>
                      </ContentRightColumn>
                    ) : item.key == 'schedule' && (
                      <ContentRightColumn>
                        <span>{scheduleSettings}</span>
                      </ContentRightColumn>
                    )}
                    <ArrowIcon height={12} width={6}/>
                  </PopupContentRight>
                ) : item.right == 'quantity' && (
                  item.key == 'publications' ? (
                    <PopupContentCounter>{posts?.length || 0}</PopupContentCounter>
                  ) : item.key == 'calendar' && (
                    <PopupContentCounter>{filteredEvents?.length || 0}</PopupContentCounter>
                  )
                )}
              </PopupContentItem>
            ))}
          </ul>
        </PopupNav>
      ))}
    </SettingsContainer>
  )
}
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
   animation: ${fadeInUp} 0.3s ease forwards;

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
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  padding: 24px 0;
  border-bottom: 2px solid #2E3954;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s, border-color 0.2s;

  &:hover {
    border-color: #D6DCEC;
    transform: translateY(-2px);
  }

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
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
`
const PopupContentInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
    
  h3 {
    font-weight: 700;   
    font-family: "Montserrat Alternates", sans-serif;
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
  @media(max-width: 768px) {
    flex: 1;
  }
`
const ContentRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  text-align: right;
  @media(max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    }
  span {
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    max-width: 450px;
    font-family: "Montserrat Alternates", sans-serif;
  }
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