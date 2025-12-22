import { useState } from "react";
import styled from "styled-components";
import light from "@/assets/popup/light.svg";

const buttons = [
    { size: 8, value: 0 },
    { size: 12, value: 20 },
    { size: 14, value: 40 },
    { size: 16, value: 60 },
    { size: 18, value: 80 },
    { size: 24, value: 100 },
];

const Drag = ({ value = 0, onChange }) => {
  const handleClick = (val) => {
    onChange(val);
  };

  return (
    <DragContainer>
      <DragLine value={value} />
      {buttons.map((btn, index) => (
        <DragButton
          key={index}
          $width={btn.size}
          $height={btn.size}
          active={value >= btn.value}
          onClick={() => handleClick(btn.value)}
        />
      ))}
      <img src={light} alt="light icon" />
    </DragContainer>
  );
};

const DragContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 32px;
    padding: 24px 32px;
    border-radius: 24px;
    background-color: #1C2336;
    @media (max-width: 480px) {
        padding: 24px;
        gap: 24px;
    }
`;

const DragLine = styled.span`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: calc(100% - 120px);
    height: 2px;
    background-color: #6A7080;
    @media (max-width: 480px) {
        width: calc(100% - 110px);
    }
    &:after {
        content: '';
        position: absolute;
        inset: 0;
        height: 100%;
        width: ${({ value }) => value}%;
        background-color: #FF7F48;
        z-index: 1;
        transition: width 0.3s ease;
    }
`;

const DragButton = styled.button`
    position: relative;
    padding: 0;
    width: ${({ $width }) => $width}px;
    height: ${({ $height }) => $height}px;
    border-radius: 50%;
    background-color: ${({ active }) => (active ? "#FF7F48" : "#6A7080")};
    z-index: 2;
    transition: background-color 0.3s ease;
`;

export default Drag;
