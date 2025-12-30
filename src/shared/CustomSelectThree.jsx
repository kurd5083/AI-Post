import React, { useState } from "react";
import styled from "styled-components";



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
              <Avatar src={option.avatar} alt="avatar" />
              {option.label}
              <Checkbox
                type="checkbox"
                checked={selected.includes(option.label)}
                readOnly
              />
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
}

const DropdownContainer = styled.div`
  width: 200px;
  position: relative;
  font-family: Arial, sans-serif;
`;

const DropdownHeader = styled.div`
  background: #1e1e2f;
  color: white;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
`;

const DropdownList = styled.div`
  background: #1e1e2f;
  border-radius: 8px;
  margin-top: 5px;
  max-height: 200px;
  overflow-y: auto;
  padding: 10px;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
  color: white;
  cursor: pointer;

  &:hover {
    background: #2a2a3e;
    border-radius: 5px;
  }
`;

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Checkbox = styled.input`
  margin-left: auto;
`;

const SelectAllButton = styled.button`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  background: #3b59ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default CustomSelectThree