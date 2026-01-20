import { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router";

import { sidebarDatas } from "@/data/sidebarDatas";

import { useMenuStore } from "@/store/menuStore";
import { useSidebarStore } from "@/store/sidebarStore";
import { usePopupStore } from "@/store/popupStore";

const MobileMenu = () => {
  const { openPopup, closePopup } = usePopupStore()
  const { menu, closeMenu } = useMenuStore();
  
  useEffect(() => {
    activePage == 2 ? openPopup('create_post', "popup") :
      activePage == 7 && openPopup('profile', "popup")
  }, [])

  const {
    activePage,
    setActivePage,
  } = useSidebarStore();

  const handleItemClick = (index) => {
    setActivePage(index);
    closeMenu();
  };


  return (
    <MenuContainer $visible={menu}>
      {sidebarDatas.map((section, sectionIndex) => (
        <MenuSection key={sectionIndex}>
          {section.title && <SectionTitle>{section.title}</SectionTitle>}

          <MenuItemsList>
            {section.items.map((item) => {
              return (
                <MenuItem
                  key={item.id}
                  $isActive={activePage === item.id}
                  onClick={() => handleItemClick(item.id)}
                >
                  {item.to ? (
                    <Link
                      to={item.to}
                      onClick={() => {
                        closePopup()
                      }}
                    >
                      {item.icon(activePage === item.id)}
                      <MenuText>{item.text}</MenuText>
                    </Link>
                  ) : (
                    <p onClick={() => openPopup(item.popup, "popup")}>
                      {item.icon(activePage === item.id)}
                      {item.text}
                    </p>
                  )}
                </MenuItem>
              );
            })}
          </MenuItemsList>
        </MenuSection>
      ))}
    </MenuContainer>
  );
};

const MenuContainer = styled.section`
  position: fixed;
  inset: 0;
  background-color: #1217268F;
  backdrop-filter: blur(20px);
  padding: 100px 24px 30px;
  transform: ${({ $visible }) => $visible ? 'translateY(0)' : 'translateY(-100%)'};
  transition: transform 0.3s ease-in-out;
  overflow-y: auto;
  scrollbar-width: none;
  z-index: 999;

  @media (min-width: 1400px) {
    display: none;
  }
`;
const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 40px;
`;
const SectionTitle = styled.h3`
  font-size: 12px;
  font-weight: 700;
  color: #6A7080;
  margin-bottom: 32px;
`;
const MenuItemsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;
const MenuItem = styled.li`
  position: relative;
  color: ${props => props.$isActive ? '#FFFFFF' : '#6A7080'};
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;

  a, p {
    display: flex;
    align-items: center;
    gap: 16px;
    color: inherit;
    text-decoration: none;
  }

  &:hover {
    color: #FFFFFF;
  }
`;
const MenuText = styled.span`
  font-size: 16px;
  white-space: nowrap;
`;

export default MobileMenu;