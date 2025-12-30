import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Checkbox from "@/shared/Checkbox";

const CustomSelectThree = ({ options = [], value = null, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const ref = useRef(null);

	const selectedOption = options.find((o) => o.id === value);

 	const handleSelect = (id) => {
    onChange(id);
    setIsOpen(false);
  };

  const headerLabel = selectedOption?.label || "Выберите канал";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContainer ref={ref}>
      <DropdownHeader onClick={() => setIsOpen((v) => !v)}>
        <HeaderText title={headerLabel}>{headerLabel}</HeaderText>
        <Arrow $open={isOpen}>⌄</Arrow>
      </DropdownHeader>

      {isOpen && (
        <DropdownList>
          <SelectAllButton
            onClick={selectAll}
            $active={selected.length === optionsData.length}
          >
            Выбрать все
          </SelectAllButton>

          {options.map((option) => (
            <DropdownItem
              key={option.id}
              onClick={() => handleSelect(option.id)}
            >
              <ItemLeft>
                {option.avatar && <Avatar src={option.avatar} />}
                <ItemText>{option.label}</ItemText>
              </ItemLeft>

              <Checkbox
                checked={option.id === value}
                onClick={(e) => e.stopPropagation()}
              />
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  width: 220px;
  position: relative;
`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
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

const Arrow = styled.span`
  transition: 0.2s;
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
`;
const DropdownList = styled.div`
  background: #222B438F;
  backdrop-filter: blur(20px);
  border-radius: 24px;
  margin-top: 20px;
  max-height: 240px;
  overflow-y: auto;
  padding: 16px;
`;
const SelectAllButton = styled.button`
  width: 100%;
  padding: 11px;
  margin-bottom: 32px;
  background: #336CFF;
  color: white;
  border-radius: 12px;
`;
const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;
const ItemText = styled.p`
    max-width: 100px;         
    white-space: nowrap;  
    overflow: hidden;     
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 700;
`;

export default CustomSelectThree