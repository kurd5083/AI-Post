import styled from "styled-components";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import useSwipeAllowed from "@/lib/useSwipeAllowed";
import useFadeOnScroll from "@/lib/useFadeOnScroll";
import { useNews } from "@/lib/news/useNews";
import { useCopyNewsToChannel } from "@/lib/news/useCopyNewsToChannel";
import { usePopupStore } from "@/store/popupStore"
import TimeIcons from "@/icons/TimeIcons";
import arrow from "@/assets/arrow.svg";

const TapeList = ({ forceHorizontal = false, padding }) => {
  const { popup } = usePopupStore();
  const channelId = popup?.data?.channelId;
  const { fadeVisible, ref } = useFadeOnScroll(20);
	const { isSwipe } = useSwipeAllowed(1400);

	const direction = forceHorizontal ? "horizontal" : (isSwipe ? "horizontal" : "vertical");

  const { newsData, newsLoding } = useNews();
  console.log(newsData)

  const { mutate: copyToChannel, isLoading: isCopying } = useCopyNewsToChannel();

  const handleCopy = (newsId) => {
		copyToChannel({
			id: newsId,
			data: {
				channelId,
				publishedAt: new Date().toISOString(),
				calendarScheduledAt: new Date().toISOString(),
			},
		});
	};

	return (
    <>
      {newsLoding ? (
        <div>Загрузка новостей...</div>
      ) : (
        <TapeContainer
          ref={ref}
          key={isSwipe}
          spaceBetween={16}
          direction={direction}
          slidesPerView="auto"
          allowTouchMove={forceHorizontal || isSwipe}
          $fadeVisible={fadeVisible}
          $padding={padding}
          modules={[Navigation]}
          navigation={{
            nextEl: ".TapeNext",
            prevEl: ".TapePrev",
          }}
        >
          {newsData?.data?.map((news) => (
            <TapeItem key={news.id} $forceHorizontal={forceHorizontal}>
              <TapeItemContent>
                <TapeItemHead>
                  <p>{news.sourceName}</p>
                </TapeItemHead>

                <Link to={`/news/${news.id}`}>
                  <TapeItemText>{news.title}</TapeItemText>
                </Link>

                <TapeItemAction onClick={() => handleCopy(news.id)} disabled={isCopying}>
                  {isCopying ? "Сохраняем..." : "Сохранить в канал"}
                </TapeItemAction>
                <TapeTime>
                  <TimeIcons />
                </TapeTime>
              </TapeItemContent>

              {news.images?.[0] && (
                <TapePostImg src={`/api/${news.images[0]}`} alt="post img" $forceHorizontal={forceHorizontal} />
              )}
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
  padding: ${({$padding}) => $padding && "0 52px"};
  padding-bottom: 20px;
  
  @media (max-width: 1600px) {
    padding: ${({$padding}) => $padding && "0 32px 30px"};
  }
  @media (max-width: 1400px) {
    padding: 0 32px ;
    max-height: fit-content;
  }
  @media (max-width: 768px) {
    padding: 0 24px;
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
    opacity: ${({$fadeVisible}) => $fadeVisible ? 1 : 0};
    pointer-events: none;
		z-index: 1;
    @media(max-width: 1400px) {
        display: none;
    }
  }
`
const TapeItem = styled(SwiperSlide)`
  box-sizing: border-box;
  display: flex;
  gap: 10px;
  border: 2px solid #1F273B;
  border-radius: 24px;
  max-width: ${({$forceHorizontal}) => $forceHorizontal && '345px'};
	padding: ${({$forceHorizontal}) => $forceHorizontal ? '8px 8px 8px 24px' : '8px 8px 8px 33px'};

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
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
const TapeItemAction = styled.span`
  color: #6A7080;
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
  width: 152px;
  object-fit: cover;
  border-radius: 24px;
	width: ${({$forceHorizontal}) => $forceHorizontal && '105px'};
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