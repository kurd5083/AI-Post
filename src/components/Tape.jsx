import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import fire from "@/assets/tape/fire.svg";
import filter from "@/assets/tape/filter.svg";
import time from "@/assets/time.svg";
import { posts } from "@/data/posts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import arrow from "@/assets/arrow.svg";
import useSwipeAllowed from "@/lib/useSwipeAllowed";

const Tape = () => {
  const { isSwipe } = useSwipeAllowed(1400);
  const [fadeVisible, setFadeVisible] = useState(true);

  const listRef = useRef(null);

  const handleScroll = () => {
    if (!listRef.current) return;
    const el = listRef.current;
    const isEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;
    setFadeVisible(!isEnd);
  };

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll);
    handleScroll(); 

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <TapeContainer>
      <TapeHead>
        <TapeTitle>
          <img src={fire} alt="fire icon" />
          <mark>Лайв</mark> лента
        </TapeTitle>
        <TapeBtn>
          <img src={filter} alt="filter icon" />
          Фильтр
        </TapeBtn>
      </TapeHead>

      <TapeList
        ref={listRef}
        key={isSwipe}
        spaceBetween={16}
        direction={isSwipe ? "horizontal" : "vertical"}
        slidesPerView="auto"
        allowTouchMove={isSwipe}
        fadeVisible={fadeVisible}
        modules={[Navigation]}
        navigation={{
          nextEl: ".next",
          prevEl: ".prev",
        }}
      >
        {posts.map((item, i) => (
          <TapeItem key={i}>
            <TapeItemContent>
              <TapeItemHead>
                <img src={item.ava} alt="ava icon" />
                <p>{item.username}</p>
              </TapeItemHead>

              <TapeItemText>{item.text}</TapeItemText>

              <TapeItemAction>Сохранить в канал</TapeItemAction>

              <TapeTime>
                <img src={time} alt="time icon" />
                <span>{item.time}</span>
              </TapeTime>
            </TapeItemContent>

            <TapePostImg src={item.img} alt="post img" />
          </TapeItem>
        ))}

        <TapePostButtons>
          <TapePostButton className="prev">
            <img src={arrow} alt="arrow icon" />
          </TapePostButton>

          <TapePostButton className="next">
            <img src={arrow} alt="arrow icon" />
          </TapePostButton>
        </TapePostButtons>
      </TapeList>
    </TapeContainer>
  );
};

const TapeContainer = styled.section`
  box-sizing: border-box;
  position: relative;
  padding: 40px 24px 32px;
  background: #121726;
  max-width: 430px;
  padding: 35px 43px 0 0;
  overflow: hidden;

  @media (max-width: 1600px) {
    max-width: 370px;
  }
  @media(max-width: 1400px) {
    max-width: 100%;
    padding: 32px 0;
  }
  &::after {
    content: '';
    position: absolute;
    right: -100px;
    top: -150px;
    width: 200px;   
    height: 200px;
    background: #1844C2;
  	filter: blur(60px);
    @media(max-width: 1400px) {
      display: none;
    }
  }
`
const TapeHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media (max-width: 1400px) {
    padding: 0 32px;
  }
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 0 24px;
  }
`
const TapeTitle = styled.h1`
  display: flex;
  flex-direction: column;
  line-height: 48px;
  font-size: 48px;
  font-weight: 900;
  @media (max-width: 480px) {
    flex-direction: row;
    gap: 16px;
		align-items: center;
    line-height: 40px;
    font-size: 40px;
  }
  img {
    width: 25px;
    height: 32px;
    margin-bottom: 20px;
		@media (max-width: 480px) {
			margin-bottom: 0px;
		}
  }
  
  mark {
    position: relative;
    color: transparent;
    background: radial-gradient(circle, #FFBD5A, #EF6284, #5D2076, #5B1F74);
    background-size: 250px;
    background-position: -30px;
    background-clip: text;
  }
`
const TapeBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: #1A1F2D;
  padding: 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #6A7080;
`
const TapeList = styled(Swiper)`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 32px;
  overflow-y: auto;
  scrollbar-width: none;  
  max-height: calc(100svh - 195px);
  padding-bottom: 20px;
  @media (max-width: 1400px) {
    padding: 0 32px;
    max-height: fit-content;
  }
  @media (max-width: 480px) {
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
    opacity: ${(props) => (props.fadeVisible ? 1 : 0)};
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
  padding: 8px 8px 8px 33px;
  border: 2px solid #1F273B;
  border-radius: 24px;
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
const TapeItemAction = styled.div`
  color: #6A7080;
  margin-bottom: 18px;
  line-height: 14px;
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
  @media (max-width: 1600px) {
    width: 105px;
  }
`
const TapePostButtons = styled.div`

`
const TapePostButton = styled.button`
	position: absolute;
	top: 50%;
  right: 16px;
	transform: translateY(-50%);
  display: none;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #1C2438;
  z-index: 2;

	@media (max-width: 1400px) {
    display: flex;
  }
	@media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
  &:first-child {
    transform: rotate(180deg) translateY(50%);
		left: 16px;
  }
`
export default Tape
