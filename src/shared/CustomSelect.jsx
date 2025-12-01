import { useState } from "react";
import styled from "styled-components";
import arrow from "@/assets/arrow.svg";

const CustomSelect = ({ options, placeholder = "Выберите значение" }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const toggle = () => setOpen(!open);

  const onSelect = (value) => {
    setSelected(value);
    setOpen(false);
  };

  return (
    <SelectWrapper>
      <SelectHeader onClick={toggle}>
        <span>{selected || placeholder}</span>
        <img src={arrow} alt="arrow icon" className={open ? "open" : ""} />
      </SelectHeader>

      {open && (
        <SelectList>
          {options.map((opt) => (
            <SelectItem key={opt.value} onClick={() => onSelect(opt.label)}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectList>
      )}
    </SelectWrapper>
  );
};

export default CustomSelect;

const SelectWrapper = styled.div`
  position: relative;
  width: 247px;
  font-weight: 700;
`;

const SelectHeader = styled.div`
  box-sizing: border-box;
  border: 2px solid #333e59;
  border-radius: 12px;
  padding: 16px 24px;
  background-color: transparent;
  color: #d6dcec;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 8px;
    height: 16px;
    transition: transform 0.2s ease;
    transform: rotate(90deg);
  }

  img.open {
    transform: rotate(270deg);
  }
`;

const SelectList = styled.ul`
  position: absolute;
  /* top: calc(100% + 4px); */
  bottom: calc(100% + 4px);;
  left: 0;
  width: 100%;
  background: #191e2d;
  border: 2px solid #333e59;
  border-radius: 12px;
  z-index: 20;
  max-height: 200px;
  overflow-y: auto;
`;

const SelectItem = styled.li`
  padding: 14px 20px;
  cursor: pointer;
  color: #d6dcec;
  font-size: 14px;

  &:hover {
    background-color: #242b3f;
  }
`;
