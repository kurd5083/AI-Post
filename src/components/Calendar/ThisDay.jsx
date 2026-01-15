import { useState, useEffect } from "react";
import styled from "styled-components";

import arrow from "@/assets/arrow.svg";

import useFadeOnScroll from "@/lib/useFadeOnScroll";
import { useUserChannels } from "@/lib/channels/useUserChannels";
import { useSendPostToChannel } from "@/lib/posts/useSendPostToChannel";

import ModernLoading from "@/components/ModernLoading";

import CustomSelect from "@/shared/CustomSelect";
import AvaPlug from "@/shared/AvaPlug";

import { useCalendarStore } from "@/store/calendarStore";
import { useNotificationStore } from "@/store/notificationStore";
import { usePopupStore } from "@/store/popupStore"


const ThisDay = ({ posts, eventsPending }) => {
  const { fadeVisible, ref } = useFadeOnScroll(20);
  const { selectedDate, setSelectedDate } = useCalendarStore();
  const { userChannels } = useUserChannels();
  const [publishingPosts, setPublishingPosts] = useState({});
  const { addNotification } = useNotificationStore();
  const { popup, openPopup } = usePopupStore();

  console.log(publishingPosts)
  const [selectedChannel, setSelectedChannel] = useState(null);
    const { mutate: sendPost, isPending: isSendPending } = useSendPostToChannel();
  
  useEffect(() => {
    if (!selectedDate) {
      const today = new Date();
      const startISO = new Date(Date.UTC(
        today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0
      )).toISOString();

      const endISO = new Date(Date.UTC(
        today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999
      )).toISOString();

      setSelectedDate({ startISO, endISO });
    }
  }, [selectedDate]);

  if (!selectedDate) return null;

  const dateObj = new Date(selectedDate.startISO);
  const changeDay = (direction) => {
    const newDate = new Date(dateObj);
    newDate.setDate(dateObj.getDate() + direction);

    const startISO = new Date(Date.UTC(
      newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 0, 0, 0, 0
    )).toISOString();

    const endISO = new Date(Date.UTC(
      newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 23, 59, 59, 999
    )).toISOString();

    setSelectedDate({ startISO, endISO });
  };

  const dateString = dateObj.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });

  const filteredPosts = selectedChannel
    ? posts?.filter(post => post.channelId === selectedChannel.value)
    : posts;

  const formatUTCTime = (utcString) => {
    if (!utcString) return "";
    const d = new Date(utcString);
    const hours = String(d.getUTCHours()).padStart(2, "0");
    const minutes = String(d.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handlePublishNow = (item) => {
    const cardId = item.id;
    const postId = item.postId;
    const channelId = item.channelId;

    setPublishingPosts(prev => ({ ...prev, [cardId]: true }));

    sendPost(
      { postId, channelId, channelTelegramId: userChannels[0].ownerTelegramId },
      {
        onSuccess: () => {
          addNotification("Пост успешно опубликован", "success");
        },
        onError: (err) => {
          addNotification(err.message || "Ошибка публикации поста", "error");
        },
        onSettled: () => {
          setPublishingPosts(prev => ({ ...prev, [cardId]: false }));
        },
      }
    );
  };

  return (
    <DayWrapper>
      <DayHeader>
        <DateText>{dateString}</DateText>
        <DayNav>
          <DayNavButton onClick={() => changeDay(-1)}>
            <img src={arrow} alt="arrow icon" />
          </DayNavButton>
          <DayNavButton onClick={() => changeDay(1)}>
            <img src={arrow} alt="arrow icon" />
          </DayNavButton>
        </DayNav>
      </DayHeader>

      <ChannelRow>
        <Label>Канал</Label>
        <CustomSelect
          options={userChannels?.map(c => ({
            value: c.id,
            label: c.name,
            avatar: c.avatarUrl
          }))}
          value={selectedChannel?.value}
          onChange={(option) => setSelectedChannel(option)}
        />
      </ChannelRow>

      <SectionTitle>Посты в этот день:</SectionTitle>
      {eventsPending && <ModernLoading text="Загрузка постов..." />}
      {filteredPosts?.length === 0 && !eventsPending && <EmptyCalendar>Нет постов</EmptyCalendar>}

      <Grid $fadeVisible={fadeVisible} ref={ref}>
        {filteredPosts?.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardAuthor>
                <AvaPlug width="32px" height="32px" />
                <CardName>{item.username}</CardName>
              </CardAuthor>
              <CardEdit
              onClick={(e) => {
                  e.stopPropagation();
                  openPopup("update_calendar_event", "popup_window", { event: item, channelId: item.channelId });
                }}
              
              >Изменить</CardEdit>
            </CardHeader>
            {item.img && <CardPreview src={item.img} width={48} height={48} />}
            <CardTitle>{item.title}</CardTitle>
            <CardSubtitle>{item?.post?.summary}</CardSubtitle>
            <CardFooter>
              <CardTime>В {formatUTCTime(item.scheduledAt)}</CardTime>
              <CardPublish
  onClick={() => handlePublishNow(item)}
  disabled={publishingPosts[item.id]} 
>
  {publishingPosts[item.id] ? "Публикация..." : "Опубликовать"}
</CardPublish>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </DayWrapper>
  )
}
const DayWrapper = styled.div`

`;
const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DateText = styled.h2`
  color: #336CFF;
  font-size: 24px;
  font-weight: 700;
`;
const DayNav = styled.div`
  display: flex;
  gap: 8px;
`;
const DayNavButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
	background: #336cff;
	&:first-child {
		img {
			transform: rotate(180deg);
		}
	}
`;
const ChannelRow = styled.div`
  margin-top: 32px;
`;
const Label = styled.div`
  font-size: 14px;
  margin-bottom: 24px;
  font-weight: 700;
`;
const SectionTitle = styled.h2`
  margin: 40px 0 24px;
  font-size: 14px;
  font-weight: 700;
`;
const Grid = styled.div`
	box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: min-content;
  gap: 16px 8px;
	overflow-y: auto;
  scrollbar-width: none;
  max-height: calc(100dvh - 480px);
	min-height: 600px;
	padding-bottom: 30px;
	
	@media(max-width: 1400px) {
    padding-bottom: 0px;
  }

	&::after {
    content: '';
    position: fixed;
    bottom: 0;
    height: 135px;
    width: 100%;
    background: linear-gradient(to top, #131826, transparent);
    backdrop-filter: blur(8px);
    mask-image: linear-gradient(to top, black 50%, transparent);
    transition: opacity 0.2s;
    opacity: ${({ $fadeVisible }) => $fadeVisible ? 1 : 0};
    pointer-events: none;
		z-index: 1;
    @media(max-width: 1400px) {
        display: none;
    }
  }
`;
const Card = styled.div`
  background: #181F30;
  border-radius: 24px;
  padding: 24px;
`;
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
const CardAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const CardName = styled.p`
  font-size: 14px;
  font-weight: 700;
`;
const CardEdit = styled.p`
  color: #336CFF;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;
const CardPreview = styled.img`
  border-radius: 16px;
  margin-bottom: 16px;
`;
const CardTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
	display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const CardSubtitle = styled.p`
	font-weight: 600;
  font-size: 14px;
  color: #6A7080;
  margin: 16px 0;
	display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CardTime = styled.p`
	font-weight: 700;
  font-size: 14px;
  color: #336CFF;
`;
const CardPublish = styled.p`
  font-weight: 700;
  font-size: 14px;
  color: #336CFF;
	cursor: pointer;
`;
const EmptyCalendar = styled.p`
  text-align: center;
  color: #6A7080;
  padding: 48px 0;
  font-weight: 600;
  background-color: #1C2438;
  border-radius: 16px;
`;
export default ThisDay
