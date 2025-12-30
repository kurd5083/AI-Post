import { useState } from "react";
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

    const toggleItem = (label) => {
        setSelected((prev) =>
            prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
        );
    };

    const selectAll = () => {
        if (selected.length === optionsData.length) {
            setSelected([]);
        } else {
            setSelected(optionsData.map((opt) => opt.label));
        }
    };

    const headerLabel = selected.length
        ? selected.length <= 2
            ? selected.join(", ")
            : `Выбрано: ${selected.length}`
        : "Выбирите канал";

    return (
        <DropdownContainer>
            <DropdownHeader onClick={() => setIsOpen(!isOpen)}>
                {headerLabel}
            </DropdownHeader>
            {isOpen && (
                <DropdownList>
                    <SelectAllButton onClick={selectAll}>Выбрать все</SelectAllButton>
                    {optionsData.map((option, idx) => (
                        <DropdownItem key={idx} onClick={() => toggleItem(option.label)}>
                            <ItemLeft>
                                <Avatar src={option.avatar} alt="avatar" />
                                <ItemText>{option.label}</ItemText>
                            </ItemLeft>

                            <Checkbox
                                type="checkbox"
                                checked={selected.includes(option.label)}
                            />
                        </DropdownItem>
                    ))}
                </DropdownList>
            )}
        </DropdownContainer>
    );
}

const DropdownContainer = styled.div`
  width: 220px;
  position: relative;
`;

const DropdownHeader = styled.div`
  cursor: pointer;
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