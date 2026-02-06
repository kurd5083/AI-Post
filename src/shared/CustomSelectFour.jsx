import { useState, useRef, useEffect, useMemo } from "react";
import styled from "styled-components";

import ArrowIcon from "@/icons/ArrowIcon";
import EyeIcon from "@/icons/EyeIcon";
import pointLine from "@/assets/point-line.svg";

import СhannelPlug from "@/shared/СhannelPlug";

const CustomSelectFour = ({ placeholder = 'Выберите пост', options = [], value = null, onChange, view = false, background = "#222735", width = "220px", right = "-20px" }) => {
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

  const formatDate = (date) => {
    const d = new Date(date);

    return (
      d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" }) +
      ", " +
      d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
    );
  };

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
          <ArrowIcon color="#6A7080" hoverColor="#6A7080" width={6} height={12} />
        </Arrow>
      </DropdownHeader>
      {isOpen && (
        <DropdownList $background={background} $right={right}>
          <DropdownContent>
            {options?.map((option) => (
              <DropdownItem key={option.id} onClick={() => toggleItem(option.id)}>
                <ItemBlock>
                  <IteName>{option.label}</IteName>
                  <ItemParams>
                    <EyeIcon color="#336CFF" hoverColor="#336CFF" width={14} height={10} cursor="default" />
                    {option.views}
                  </ItemParams>
                </ItemBlock>
                <ItemBlock>
                  <ItemDate>{formatDate(option.date)}</ItemDate>
                  <ItemParams>
                    <img src={pointLine} alt="" />
                    {option.forward}
                  </ItemParams>
                </ItemBlock>
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
  box-sizing: border-box;
  position: absolute;
  right: ${({ $right }) => $right};
  background: ${({ $background }) => $background};
  backdrop-filter: blur(20px);
  border-radius: 12px;
  margin-top: 20px;
  max-height: 200px;
  width: 180px;
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
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  border-bottom: 2px solid;
  border-image: linear-gradient(to right, #242A3900, #6A7080, #242A3900) 1;
  padding-bottom: 16px;

  &:last-child {
    padding-bottom: 0;
    border: 0;
  }
`;
const ItemBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;
const IteName = styled.p`
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: 700;
`;
const ItemDate = styled.p`
  color: #6A7080;
  font-size: 12px;
  font-weight: 700;
`;
const ItemParams = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 700;
`;

export default CustomSelectFour;
