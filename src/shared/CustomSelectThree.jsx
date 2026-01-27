import { useState, useRef, useEffect, useMemo } from "react";
import styled from "styled-components";

import ArrowIcon from "@/icons/ArrowIcon";

import Checkbox from "@/shared/Checkbox";
import СhannelPlug from "@/shared/СhannelPlug";

const CustomSelectThree = ({ placeholder = 'Выберите канал', options = [], value = null, onChange, view = false, background = "#222B438F", width = "220px", right = "-20px" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggleItem = (id) => {
    if (id !== value) {
      onChange(id);
    }
    setIsOpen(false);
  };
  const selected = useMemo(() => {
    return options?.find((o) => o.id === value);
  }, [value, options]);
  
  const headerLabel = useMemo(() => {
    if (!value) return placeholder;
    const selectedOption = options?.find((o) => o.id === value);
    return selectedOption?.label || placeholder;
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContainer ref={ref} $width={width}>
      <DropdownHeader onClick={(e) => {
        e.stopPropagation();
        setIsOpen(v => !v);
      }} $view={view}>
        {selected?.icon && <СhannelPlug width="32px" height="32px" text={selected.icon} />}
        <HeaderText title={headerLabel}>{headerLabel}</HeaderText>
        <Arrow $open={isOpen}>
          <ArrowIcon color="#336CFF" hoverColor="#336CFF" width={6} height={12} />
        </Arrow>
      </DropdownHeader>

      {isOpen && (
        <DropdownList $background={background} $right={right}>
          <DropdownContent>
            {options?.map((option) => (
              <DropdownItem key={option.id} onClick={() => toggleItem(option.id)}>
                <ItemLeft>
                  {selected?.icon && <СhannelPlug width="24px" height="24px" text={option.icon} />}
                  <ItemText>{option.label}</ItemText>
                </ItemLeft>
                <Checkbox
                  checked={value === option.id}
                  onClick={(e) => e.stopPropagation()}
                  width="24px"
                  height="24px"
                />
              </DropdownItem>
            ))}
          </DropdownContent>
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  width: ${({ $width }) => $width};
  position: relative;
`;
const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: ${({ $view }) => $view ? 'flex-end' : 'flex-start'};
  cursor: pointer;
`;
const HeaderText = styled.p`
  max-width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  color: #336CFF;
  font-size: 14px;
`;
const Arrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  transform: rotate(90deg);
  ${({ $open }) => $open && `transform: rotate(270deg);`}
`;
const DropdownList = styled.div`
  position: absolute;
  right: ${({ $right }) => $right};
  background: ${({ $background }) => $background};
  backdrop-filter: blur(20px);
  border-radius: 24px;
  margin-top: 20px;
  max-height: 240px;
  width: 220px;
  overflow-y: auto;
  scrollbar-width: none;
  padding: 16px;
  z-index: 20;
`;
const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
`;
const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const ItemText = styled.p`
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 700;
`;

export default CustomSelectThree;
