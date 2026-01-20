import styled from "styled-components";
import ArrowIcon from "@/icons/ArrowIcon";

const Counter = ({ placeholder, value, onChange, disabled }) => {
  const handleChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      const newValue = val === "" ? "" : Number(val);
      onChange(newValue);
    }
  };

  const increment = () => {
    const newValue = (value || 0) + 1;
    onChange(newValue);
  };

  const decrement = () => {
    const newValue = Math.max((value || 0) - 1, 0);
    onChange(newValue);
  };

  return (
    <CounterWrapper>
      <Input type="text" placeholder={placeholder} value={value} onChange={handleChange} disabled={disabled}/>
      <ButtonsContainer>
        <CounterButton disabled={disabled} onClick={increment}>
          <ArrowIcon color="#D6DCEC"  width={9} height={9}/>
        </CounterButton>
        <CounterButton disabled={disabled} onClick={decrement}>
          <ArrowIcon color="#D6DCEC"  width={9} height={9}/>
        </CounterButton>
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
`;

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