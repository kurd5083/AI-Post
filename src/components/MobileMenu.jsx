import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useMenuStore } from "@/store/menuStore";
import styled from "styled-components";
import { sidebarData } from "@/data/sidebarData";
import { useSidebarStore } from "@/store/sidebarStore";

const MobileMenu = () => {
  const { menu, closeMenu } = useMenuStore();
  const location = useLocation();
  const {
    activePage,
    setActivePage,
  } = useSidebarStore();
  const handleItemClick = (index) => {
    setActivePage(index);
    closeMenu();
  };

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <MenuContainer $visible={menu}>
      {sidebarData.map((section, sectionIndex) => (
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
                  <MenuLink to={item.to}>
                    {item.icon(activePage === item.id)}
                    <MenuText>{item.text}</MenuText>
                  </MenuLink>
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
  padding: 75px 24px 30px;
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
  font-size: 20px;
  font-weight: 700;
  color: ${props => props.$isActive ? '#FFFFFF' : '#6A7080'};
  cursor: pointer;

  &:hover {
    color: #FFFFFF;
  }
`;

const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  color: inherit;
  text-decoration: none;
`;

const MenuText = styled.span`
  font-size: 14px;
  white-space: nowrap;
`;

export default MobileMenu;