import { useState } from "react";
import styled from "styled-components";
import arrow from "@/assets/arrow.svg";
const Counter = ({placeholder}) => {
    const [value, setValue] = useState(null);

    const handleChange = (e) => {
        const val = e.target.value;
        if (/^\d*$/.test(val)) {
            setValue(val === "" ? "" : Number(val));
        }
    };

    const increment = () => setValue(prev => (prev || 0) + 1);
    const decrement = () => setValue(prev => Math.max((prev || 0) - 1, 0));

    return (
        <CounterWrapper>
            <Input type="text" placeholder={placeholder} value={value} onChange={handleChange} />
            <ButtonsContainer>
                <CounterButton onClick={increment}><img src={arrow} alt="arrow icon" width={9} height={9}/></CounterButton>
                <CounterButton onClick={decrement}><img src={arrow} alt="arrow icon" width={9} height={9}/></CounterButton>
            </ButtonsContainer>
        </CounterWrapper>
    );
};
const CounterWrapper = styled.div`
    position: relative;
    max-width: 189px;
`;

const Input = styled.input`
    border: 2px solid #333E59;
    border-radius: 12px;
    width: 100%;
    padding: 16px 24px;
    color: #D6DCEC;
    font-size: 14px;
    font-weight: 700;
    background-color: transparent;
    &::placeholder {
        color: #D6DCEC;
    }
`;
const ButtonsContainer = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 16px;
    display: flex;
    flex-direction: column;
    gap: 2px;
`
const CounterButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotate(270deg);
    &:nth-child(2) {
        transform: rotate(90deg);
    }
`;

export default Counter;