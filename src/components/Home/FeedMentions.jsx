import { useState, useEffect } from "react";
import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import ArrowIcon from "@/icons/ArrowIcon";
import TgIcon from "@/icons/TgIcon";

import MentionsCard from "@/components/Cards/MentionsCard";

import CustomSelectThree from "@/shared/CustomSelectThree";

import { useUserChannels } from "@/lib/channels/useUserChannels";
import { useMentions } from "@/lib/tgStat/useMentions";

const FeedMentions = () => {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
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
        {!!mentionItems || !mentionItems.length === 0 && (
          <FeedMentionsButtons>
            <FeedMentionsButton
              disabled={atStart}
              $disabled={atStart}
              className="FeedMentionsPrev"
            >
              <ArrowIcon color="#D6DCEC" />
            </FeedMentionsButton>
            <FeedMentionsButton
              disabled={atEnd}
              $disabled={atEnd}
              className="FeedMentionsNext"
            >
              <ArrowIcon color="#D6DCEC" />
            </FeedMentionsButton>
          </FeedMentionsButtons>
        )}
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
          onReachEnd={() => {
            setFadeVisible(false)
            setAtEnd(true)
          }}
          onFromEdge={() => {
            setFadeVisible(true)
            setAtStart(false);
            setAtEnd(false);
          }}
          onReachBeginning={() => setAtStart(true)}
          onSlideChange={(swiper) => {
            setAtStart(swiper.isBeginning);
            setAtEnd(swiper.isEnd);
          }}
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
  border: 2px solid  ${({ $disabled }) => ($disabled ? "#1C2438" : "transparent")};
	background-color: ${({ $disabled }) => ($disabled ? "transparent" : "#1C2438")};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};

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
  @media (max-width: 1400px) {
    margin: 24px 32px 0;
  }
  @media (max-width: 768px) {
    margin: 24px 24px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export default FeedMentions