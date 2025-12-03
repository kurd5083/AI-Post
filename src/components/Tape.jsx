import { useRef, useState } from "react";
import styled from "styled-components";
import fire from "@/assets/tape/fire.svg";
import filter from "@/assets/tape/filter.svg";
import time from "@/assets/time.svg";
import { posts } from "@/data/posts";

const Tape = () => {
    const listRef = useRef(null);
    const [fadeVisible, setFadeVisible] = useState(true);

    const handleScroll = () => {
        const el = listRef.current;
        if (!el) return;

        const isEnd = el.scrollHeight - el.scrollTop === el.clientHeight;
        setFadeVisible(!isEnd);
    };

    return (
        <TapeContainer>
            <TapeHead>
                <TapeTitle><img src={fire} alt="fire icon" /><mark>Лайв</mark> лента</TapeTitle>
                <TapeBtn><img src={filter} alt="filter icon" />Фильтр</TapeBtn>
            </TapeHead>
            <TapeList ref={listRef} onScroll={handleScroll} fadeVisible={fadeVisible}>
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
            </TapeList>
        </TapeContainer>
    )
}
const TapeContainer = styled.section`
    position: relative;
    padding: 40px 24px 32px;
    background: #121726;
    max-width: 430px;
    padding: 35px 43px 0 0;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        right: -100px;
        top: -150px;
        width: 200px;   
        height: 200px;
        background: #1844C2;
        filter: blur(60px);
    }
`
const TapeHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`
const TapeTitle = styled.h1`
    display: flex;
    flex-direction: column;
    line-height: 48px;
    font-size: 48px;
    font-weight: 900;
    img {
        width: 25px;
        height: 32px;
        margin-bottom: 20px;
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
const TapeList = styled.section`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 32px;
    max-height: calc(100vh - 230px);
    overflow-y: auto;
    scrollbar-width: none;
    
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        height: 135px;
        width: 100%;
        background: linear-gradient(to top, #131826, transparent);
        backdrop-filter: blur(8px);
        mask-image: linear-gradient(to top, black 50%, transparent);
        transition: opacity 0.2s;
        opacity: ${props => props.fadeVisible ? 1 : 0};
        pointer-events: none;
    }
`
const TapeItem = styled.article`
    box-sizing: border-box;
    display: flex;
    gap: 40px;
    padding: 8px 8px 8px 33px;
    border: 2px solid #1F273B;
    border-radius: 24px;

    &:hover {
        background-color: #181F30;
        border: 2px solid #181F30;
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
    height: 203px;
    object-fit: cover;
    border-radius: 24px;
`

export default Tape
