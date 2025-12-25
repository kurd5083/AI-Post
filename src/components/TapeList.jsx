import styled from "styled-components";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import useSwipeAllowed from "@/lib/useSwipeAllowed";
import useFadeOnScroll from "@/lib/useFadeOnScroll";
import { useNews } from "@/lib/news/useNews";
import { usePopupStore } from "@/store/popupStore"
import TimeIcons from "@/icons/TimeIcons";
import arrow from "@/assets/arrow.svg";
import ModernLoading from "@/components/ModernLoading";

const TapeList = ({ forceHorizontal = false, padding }) => {
  const { openPopup } = usePopupStore();
  const { fadeVisible, ref } = useFadeOnScroll(20);
  const { isSwipe } = useSwipeAllowed(1400);

  const direction = forceHorizontal ? "horizontal" : (isSwipe ? "horizontal" : "vertical");

  const { newsData, newsLoding } = useNews();

  return (
    <>
      {!newsLoding ? (
        <TapeContainer
          ref={ref}
          key={isSwipe}
          spaceBetween={16}
          direction={direction}
          slidesPerView="auto"
          allowTouchMove={forceHorizontal || isSwipe}
          $fadeVisible={fadeVisible}
          $forceHorizontal={forceHorizontal}
          $padding={padding}
          modules={[Navigation]}
          navigation={{
            nextEl: ".TapeNext",
            prevEl: ".TapePrev",
          }}
        >
          {newsData?.data?.map((news) => (
            <TapeItem key={news.id} $forceHorizontal={forceHorizontal}>
              <TapeItemContent $forceHorizontal={forceHorizontal}>
                <TapeItemHead>
                  {/* <img src={news.ava} alt="ava icon" /> */}
                  <p>{news.sourceName}</p>
                </TapeItemHead>
                <Link to={`/news/${news.id}`}>
                  <Dotdotdot clamp={3}>
                    <TapeItemText>{news.title}</TapeItemText>
                  </Dotdotdot>
                </Link>
                <TapeItemAction onClick={() => openPopup("select_channel", "popup_window", { newsId: news.id })}>
                  Сохранить в канал
                </TapeItemAction>
                <TapeTime>
                  <TimeIcons />
                  <span>{news.readingTime}</span>
                </TapeTime>
              </TapeItemContent>
              <TapePostImg src={`/.netlify/functions/api-proxy/${news.images[0]}`} alt="post img" $forceHorizontal={forceHorizontal} />
            </TapeItem>
          ))}
          {(forceHorizontal || isSwipe) && (
            <div>
              <TapePostButton className="TapePrev">
                <img src={arrow} alt="arrow icon" />
              </TapePostButton>

              <TapePostButton className="TapeNext">
                <img src={arrow} alt="arrow icon" />
              </TapePostButton>
            </div>
          )}
        </TapeContainer>
      ) : (
        <ModernLoading text="Загрузка новостей..." />
      )}
    </>
  )
}

const TapeContainer = styled(Swiper)`
  position: relative;
  box-sizing: border-box;
  display: flex;
  gap: 24px;
  margin-top: 32px;
  overflow-y: auto;
  scrollbar-width: none;  
  max-height: calc(100dvh - 215px);
  padding: ${({ $padding }) => $padding && "0 52px"};
  padding-bottom: 20px;
  
  @media (max-width: 1600px) {
    padding: ${({ $padding }) => $padding && "0 32px 30px"};
  }
  @media (max-width: 1400px) {
    padding: 0 32px ;
    max-height: fit-content;
  }
  @media (max-width: 768px) {
    padding: 0 24px;
  }
  /* ${({ $forceHorizontal, $fadeVisible }) =>
    !$forceHorizontal &&
    `
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
        opacity: ${$fadeVisible ? 1 : 0};
        pointer-events: none;
        z-index: 1;
        
        @media(max-width: 1400px) {
          display: none;
        }
      }
  `} */
`
const TapeItem = styled(SwiperSlide)`
  box-sizing: border-box;
  display: flex;
  gap: 10px;
  border: 2px solid #1F273B;
  border-radius: 24px;
  max-width: ${({ $forceHorizontal }) => $forceHorizontal && '345px'};
	padding: ${({ $forceHorizontal }) => $forceHorizontal ? '8px 8px 8px 24px' : '8px 8px 8px 33px'};

  @media(max-width: 1600px) {
    padding: 8px 8px 8px 24px;
  }
	@media(max-width: 1400px) {
    max-width: 345px;
  }

  &:hover {
    background-color: #181F30;
    border: 2px solid #181F30;
  }
  &:last-child {
    margin-bottom: 0 !important;
  }
`
const TapeItemContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  max-width: calc(100% - 162px);
  max-width: ${({ $forceHorizontal }) =>
    $forceHorizontal ? 'calc(100% - 115px)' : 'calc(100% - 162px)'};

  @media(max-width: 1600px) {
    max-width: calc(100% - 115px);
  }
`
const TapeItemHead = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 13px;
  font-size: 14px;
  font-weight: 700;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
`
const TapeItemText = styled.div`
  margin-bottom: 18px;
  font-size: 20px;
  line-height: 20px;
  font-weight: 700;
  /* display: -webkit-box; */
  /* -webkit-line-clamp: 3; */
  /* -webkit-box-orient: vertical; */
  /* overflow: hidden; */
`
const TapeItemAction = styled.span`
  color: #336CFF;
  margin-bottom: 18px;
  line-height: 14px;
  cursor: pointer;
`
const TapeTime = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
  color: #6A7080;
`
const TapePostImg = styled.img`
  object-fit: cover;
  border-radius: 24px;
	width: ${({ $forceHorizontal }) => $forceHorizontal ? '105px' : '152px'};
  @media (max-width: 1600px) {
    width: 105px;
  }
`
const TapePostButton = styled.button`
	position: absolute;
	top: 50%;
  right: 32px;
	transform: translateY(-50%);
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #1C2438;
  z-index: 2;
  @media (max-width: 1400px) {
   right: 16px;
  }
	@media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
	
  &:first-child {
    transform: rotate(180deg) translateY(50%);
		left: 32px;
    @media (max-width: 1400px) {
      left: 16px;
    }
  }
`
export default TapeList