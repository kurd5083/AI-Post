import { useState, useMemo } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { feedmentionsDatas } from "@/data/feedmentionsDatas";
import arrow from "@/assets/arrow.svg";
import CardPablish from "@/components/CardPablish";
import TgIcon from "@/icons/TgIcon";
import CustomSelectThree from "@/shared/CustomSelectThree";
import { useUserChannels } from "@/lib/channels/useUserChannels";
import { useMentions } from "@/lib/tgStat/useMentions";

const FeedMentions = () => {
  const [fadeVisible, setFadeVisible] = useState(true);
  const { userChannels } = useUserChannels();
  const [selectedChannels, setSelectedChannels] = useState([]);

  const { mentions, mentionsLoading } = useMentions({
    channelIds: selectedChannels.map(c => c.id),
  });
  console.log(mentions)
  const mentionsItems = useMemo(() => {
    if (!mentions?.response?.items) return [];
    return mentions.response.items.map(item => ({
      ...item,
      channel: mentions.response.channels?.find(c => c.id === item.channelId),
    }));
  }, [mentions]);
  console.log(mentionsItems)
  return (
    <FeedMentionsContainer>
      <FeedMentionsHead>
        <FeedMentionsTitle>
          <TgIcon color="#579AFF"/>
          Лента упоминаний
          <CustomSelectThree
            options={userChannels?.map((c) => ({
              id: c.id,
              label: c.name,
              avatar: c.avatarUrl,
            }))}
            value={selectedChannels}
            onChange={setSelectedChannels}
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
        {feedmentionsDatas.map((item, index) => (
          <FeedMentionsItem key={index}>
            <CardPablish item={item} />
          </FeedMentionsItem>
        ))}
      </FeedMentionsList>
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

  @media (max-width: 480px) {
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(10px);
    width: 32px;
    height: 32px;
    z-index: 2;
  }
  &:first-child {
    transform: rotate(180deg);
    @media (max-width: 480px) {
      transform: rotate(180deg) translateY(-10px);
      left: 16px;
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
    opacity: ${({$fadeVisible}) => $fadeVisible ? 1 : 0};
    pointer-events: none;
    @media (max-width: 480px) {
      display: none;
    }
  }
`;

const FeedMentionsItem = styled(SwiperSlide)`
  max-width: 345px;
`
export default FeedMentions