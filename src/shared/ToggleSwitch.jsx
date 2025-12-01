import { useState } from "react";
import styled from "styled-components";

const ToggleSwitch = ({ bg }) => {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
      setIsOn(prev => !prev);
    };

    return (
        <SwitchContainer>
            <SwitchLabel>
                <SwitchInput type="checkbox" checked={isOn} onChange={handleToggle} bg={bg}/>
                <Slider />
            </SwitchLabel>
        </SwitchContainer>
    )
}

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 93px;
  height: 40px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${props => props.bg};
  }

  &:checked + span::before {
    transform: translateX(50px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #6A7080;
  transition: 0.4s;
  border-radius: 32px;

  &::before {
    position: absolute;
    content: "";
    height: 24px;
    width: 24px;
    left: 10px;
    top: 8px;
    background-color: #fff;
    transition: 0.4s;
    border-radius: 50%;
  }
`;
export default ToggleSwitch
