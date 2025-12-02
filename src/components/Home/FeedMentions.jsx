import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { feedmentions } from "@/data/feedmentions";
import tg from "@/assets/feedmentions/tg.svg";
import arrow from "@/assets/feedmentions/arrow.svg";
import CardPablish from "@/components/CardPablish";

const FeedMentions = () => {
  return (
    <FeedMentionsContainer>
      <FeedMentionsHead>
        <FeedMentionsTitle>
          <img src={tg} alt="tg icon" />
          Лента упоминаний
        </FeedMentionsTitle>
        <FeedMentionsButtons>
          <FeedMentionsButton className="prev">
            <img src={arrow} alt="arrow icon" />
          </FeedMentionsButton>
          <FeedMentionsButton className="next">
            <img src={arrow} alt="arrow icon" />
          </FeedMentionsButton>
        </FeedMentionsButtons>
      </FeedMentionsHead>

      <FeedMentionsList
        modules={[Navigation]}
        navigation={{
          nextEl: ".next",
          prevEl: ".prev",
        }}
        spaceBetween={16}
        slidesPerView='auto'
      >
        {feedmentions.map((item, index) => (
            <FeedMentionsItem key={index}>
              <CardPablish item={item}/>
            </FeedMentionsItem>
        ))}
      </FeedMentionsList>
    </FeedMentionsContainer>
  );
};

const FeedMentionsContainer = styled.section`
    margin-top: 70px;
    padding: 0 24px;
`
const FeedMentionsHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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

    &:last-child {
        transform: rotate(180deg);
    }
`
const FeedMentionsList = styled(Swiper)`
    position: relative;
    margin-top: 24px;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 80px;
        height: 100%;
        background: linear-gradient(to left, #131826, #13182600);
        backdrop-filter: blur(8px);
        mask-image: linear-gradient(to left, black 50%, transparent);
        z-index: 1;
    }
`
const FeedMentionsItem = styled(SwiperSlide)`
    max-width: 345px;
`
export default FeedMentions