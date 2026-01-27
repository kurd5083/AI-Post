import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import ArrowIcon from "@/icons/ArrowIcon";

import СhannelPlug from "@/shared/СhannelPlug";

const CustomSelect = ({ options = [], value, onChange, placeholder = "Выберите значение", padding=true, border=true, width }) => {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  const toggle = () => setOpen(prev => !prev);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <SelectWrapper ref={selectRef} $width={width}>
      <SelectHeader onClick={toggle} $border={border} $padding={padding}>
        <HeaderLeft>
          {selectedOption?.icon && <СhannelPlug width="32px" height="32px" text={selectedOption.icon} />}
          <span>{selectedOption?.label || placeholder}</span>
        </HeaderLeft>
        <HeaderArrow className={open ? "open" : ""}>
          <ArrowIcon color="#D6DCEC" />
        </HeaderArrow>
      </SelectHeader>

      {open && (
        <SelectList>
          {options?.map((opt) => (
            <SelectItem
              key={opt.value}
              onClick={() => handleSelect(opt)}
            >
              {opt.icon && <СhannelPlug width="32px" height="32px" text={opt.icon} />}
              {opt.label}
            </SelectItem>
          ))}
        </SelectList>
      )}
    </SelectWrapper>
  );
};

const SelectWrapper = styled.div`
  position: relative;
  width: ${({$width}) => $width ? $width : '247px'};
  font-weight: 700;
`;

const SelectHeader = styled.div`
  box-sizing: border-box;
  border: ${({$border}) => !$border ? '' : '2px solid #333e59'};
  border-radius: 12px;
  padding: ${({$padding}) => !$padding ? '' : ' 16px 24px'};
  background-color: transparent;
  color: #d6dcec;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;
const HeaderArrow = styled.div`
  transition: transform 0.2s ease;
  transform: rotate(90deg);

  &.open {
    transform: rotate(270deg);
  }
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const SelectList = styled.ul`
  box-sizing: border-box;
  position: absolute;
  top: calc(100% + 4px);
  min-width: fit-content;
  left: 0;
  width: 100%;
  background: #202638;
  border-radius: 24px;
  z-index: 20;
  max-height: 200px;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const SelectItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px;
  cursor: pointer;
  color: #d6dcec;
  font-size: 14px;
  font-weight: 700;
  border-bottom: 2px solid #2e3954;

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    background-color: #242b3f;
  }
`;

export default CustomSelect;
