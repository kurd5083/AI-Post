import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Checkbox from "@/shared/Checkbox";

const optionsData = [
  { label: "Antropia D...", avatar: "/mnt/data/69578d59-ba12-4ee5-98d9-e4fdbad3afec.png" },
  { label: "123", avatar: "/mnt/data/69578d59-ba12-4ee5-98d9-e4fdbad3afec.png" },
  { label: "51251", avatar: "/mnt/data/69578d59-ba12-4ee5-98d9-e4fdbad3afec.png" },
  { label: "Фцвфцвфцв", avatar: "/mnt/data/69578d59-ba12-4ee5-98d9-e4fdbad3afec.png" },
];

const CustomSelectThree = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const ref = useRef(null);

  const toggleItem = (label) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const selectAll = () => {
    setSelected(
      selected.length === optionsData.length
        ? []
        : optionsData.map((o) => o.label)
    );
  };

  const headerLabel = selected.length
    ? selected.length <= 2
      ? selected.join(", ")
      : `Выбрано: ${selected.length}`
    : "Выберите канал";

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

          {optionsData.map((option) => (
            <DropdownItem
              key={option.label}
              onClick={() => toggleItem(option.label)}
            >
              <ItemLeft>
                <Avatar src={option.avatar} />
                <ItemText>{option.label}</ItemText>
              </ItemLeft>

              <Checkbox
                checked={selected.includes(option.label)}
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