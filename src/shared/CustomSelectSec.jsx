import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ArrowIcon from "@/icons/ArrowIcon";

const CustomSelect = ({
  options,
  placeholder = "Выберите значение",
  value,
  onChange,
  fs,
  padding,
  width,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const selectRef = useRef(null);

  const toggle = () => setOpen(prev => !prev);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    if (onChange) onChange(option);
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

  useEffect(() => {
    if (value !== undefined && options) {
      const sel = options.find(opt => opt.value === value);
      setSelected(sel || null);
    }
  }, [value, options]);

  return (
    <SelectWrapper ref={selectRef} $width={width}>
      <SelectHeader onClick={toggle} $fs={fs} $padding={padding}>
        <HeaderLeft>
          {selected?.icon && <img src={selected.icon} alt="icon" width={16} height={16} />}
          <span>{selected?.label || placeholder}</span>
        </HeaderLeft>
        <HeaderArrow className={open ? "open" : ""} >
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
              {opt.icon && <img src={opt.icon} alt="icon" />}
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
  max-width: ${({$width}) => $width ? $width : '340px'};
  width: 100%;
  font-weight: 700;
`;
const SelectHeader = styled.div`
  box-sizing: border-box;
  border-bottom: 2px solid #333e59;
  padding-bottom: ${({$padding}) => $padding ? $padding : '32px'};
  color: #d6dcec;
  font-size: ${({$fs}) => $fs ? $fs : '24px'};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
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
  min-width: 140px;
  overflow-y: auto;
  scrollbar-width: none;
  z-index: 222;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SelectItem = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  cursor: pointer;
  color: #d6dcec;
  font-size: 16px;
  font-weight: 700;
  border-bottom: 2px solid #2E3954;
  
  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    background-color: #242b3f;
  }
`;

export default CustomSelect;
