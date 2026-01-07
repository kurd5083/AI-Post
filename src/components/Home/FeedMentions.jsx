import { useState, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import arrow from "@/assets/arrow.svg";
import MentionsCard from "@/components/MentionsCard";
import TgIcon from "@/icons/TgIcon";
import CustomSelectThree from "@/shared/CustomSelectThree";
import { useUserChannels } from "@/lib/channels/useUserChannels";
import { useMentions } from "@/lib/tgStat/useMentions";

const FeedMentions = () => {
  const [fadeVisible, setFadeVisible] = useState(true);
  const { userChannels } = useUserChannels();
  const [selectedChannelId, setSelectedChannelId] = useState(null);

  useEffect(() => {
    if (userChannels?.length) {
      setSelectedChannelId(userChannels[0].id);
    }
  }, [userChannels]);

  const { mentions, mentionsLoading } = useMentions({
    channelId: selectedChannelId,
    limit: 8,
  });

  const mentionItems = mentions?.response?.items || [];
  console.log(mentionItems)
  return (
    <FeedMentionsContainer>
      <FeedMentionsHead>
        <FeedMentionsTitle>
          <TitleLeft>
            <TgIcon color="#579AFF" />
            Лента упоминаний
          </TitleLeft>
          <CustomSelectThree
            options={userChannels?.map((c) => ({
              id: c.id,
              label: c.name,
              avatar: c.avatarUrl,
            }))}
            value={selectedChannelId}
            onChange={setSelectedChannelId}
          />
        </FeedMentionsTitle>

        <FeedMentionsButtons>
          <FeedMentionsButton className="FeedMentionsPrev">
            <img src={arrow} alt="arrow icon" />
          </FeedMentionsButton>
          <FeedMentionsButton className="FeedMentionsNext">
            <img src={arrow} alt="arrow icon" />
          </FeedMentionsButton>
        </FeedMentionsButtons>
      </FeedMentionsHead>

       {!selectedChannelId || mentionsLoading ? (
          <EmptyMentions>Загрузка упоминаний...</EmptyMentions>
        ) : !mentionItems || mentionItems.length === 0 ? (
          <EmptyMentions>Для выбранного канала нет упоминаний</EmptyMentions>
        ) : (
        <FeedMentionsList
          $fadeVisible={fadeVisible}
          modules={[Navigation]}
          navigation={{
            nextEl: ".FeedMentionsNext",
            prevEl: ".FeedMentionsPrev",
          }}
          spaceBetween={16}
          slidesPerView="auto"
          onReachEnd={() => setFadeVisible(false)}
          onFromEdge={() => setFadeVisible(true)}
        >
          {mentionItems.map((item, index) => (
            <FeedMentionsItem key={item.mentionId || index}>
              <MentionsCard item={item} />
            </FeedMentionsItem>
          ))}
        </FeedMentionsList>
      )}
    </FeedMentionsContainer>
  );
};

const FeedMentionsContainer = styled.section`
  position: relative;
  margin-top: 70px;
  padding: 0 56px;
  
  @media (max-width: 1600px) {
    padding: 0 32px;
  }
  @media (max-width: 1400px) {
    padding: 0;
  }
  @media (max-width: 480px) {
    margin-top: 32px;
  }
`
const FeedMentionsHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1400px) {
    padding: 0 32px;
  }
  @media (max-width: 768px) {
    padding: 0 24px;
  }
`
const FeedMentionsTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 30px;
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`
const TitleLeft = styled.span`
  display: flex;
  align-items: center;
  gap: 24px;
`
const FeedMentionsButtons = styled.div`
  display: flex;
  gap: 8px;
`
const FeedMentionsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #1C2438;

  @media (max-width: 768px) {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(10px);
    width: 32px;
    height: 32px;
    z-index: 2;
  }
  @media (max-width: 640px) {
    transform: translateY(30px);
  }
  &:first-child {
    transform: rotate(180deg);
    @media (max-width: 768px) {
      transform: rotate(180deg) translateY(-10px);
      left: 16px;
    }
    @media (max-width: 640px) {
      transform: rotate(180deg) translateY(-30px);
    }
  }
`
const FeedMentionsList = styled(Swiper)`
  position: relative;
  margin-top: 24px;
  @media (max-width: 1400px) {
    padding: 0 32px;
  }
  @media (max-width: 768px) {
    padding: 0 24px;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 100%;
    background: linear-gradient(to left, #131826, transparent);
    backdrop-filter: blur(2px);
    mask-image: linear-gradient(to left, black 50%, transparent);
    z-index: 1;
    transition: opacity 0.25s ease;
    opacity: ${({ $fadeVisible }) => $fadeVisible ? 1 : 0};
    pointer-events: none;
    @media (max-width: 480px) {
      display: none;
    }
  }
`;

const FeedMentionsItem = styled(SwiperSlide)`
  max-width: 345px;
`
const EmptyMentions = styled.div`
  box-sizing: border-box;
  text-align: center;
  color: #6A7080;
  padding: 48px 0;
  font-weight: 600;
  background-color: #1C2438;
  border-radius: 16px;
  margin-top: 24px;
`;

export default FeedMentions