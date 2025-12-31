import { useState, useRef, useEffect, useMemo } from "react";
import styled from "styled-components";
import Checkbox from "@/shared/Checkbox";
import arrow_blue from "@/assets/arrow-blue.svg";

const CustomSelectThree = ({ options = [], value = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggleItem = (id) => {
    onChange(
      value.includes(id)
        ? value.filter((v) => v !== id)
        : [...value, id]
    );
  };

  const selectAll = () => {
    onChange(
      value.length === options.length
        ? []
        : options.map((o) => o.id)
    );
  };

  const headerLabel = useMemo(() => {
		if (!value.length) return "Выберите канал";

		if (value.length === options.length) return "Выбраны все";

		const selectedOptions = options.filter((o) => value.includes(o.id));

		if (selectedOptions.length <= 2) {
			return selectedOptions.map((o) => o.label).join(", ");
		}

		return `Выбрано: ${selectedOptions.length}`;
	}, [value, options]);

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
				<Arrow $open={isOpen} src={arrow_blue} alt="arrow icon" width={12} height={6}/>
      </DropdownHeader>

      {isOpen && (
        <DropdownList>
          <SelectAllButton
            onClick={selectAll}
            $active={value.length === options.length}
          >
            Выбрать все
          </SelectAllButton>
					<DropdownContent>
						{options.map((option) => (
							<DropdownItem
								key={option.id}
								onClick={() => toggleItem(option.id)}
							>
								<ItemLeft>
									{option.avatar && <Avatar src={option.avatar} />}
									<ItemText>{option.label}</ItemText>
								</ItemLeft>

								<Checkbox
									checked={value.includes(option.id)}
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
  width: 160px;
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
const Arrow = styled.img`
  transition: 0.2s;
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
`;
const DropdownList = styled.div`
	position: absolute;
	right: 20px;
  background: #222B438F;
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
const SelectAllButton = styled.button`
  width: 100%;
  padding: 11px;
	font-weight: 700;
  margin-bottom: 20px;
  background: #336CFF;
  color: white;
  border-radius: 12px;
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