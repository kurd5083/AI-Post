import { useState } from "react";
import { Link } from "react-router";
import styled from "styled-components";
import { menuItems } from "@/data/sidebar";
import arrow_back from "@/assets/sidebar/arrow-back.svg";
import acc_icon from "@/assets/sidebar/acc-icon.png";
import { usePopupStore } from "@/store/popupStore";

const Sidebar = () => {
  const { closePopup } = usePopupStore()
  const [activePage, setActivePage] = useState(1);
  
  const handleItemClick = (index) => {
    setActivePage(index);
  };
  
  return (
    <SidebarContainer>
      <SidebarHead>
        <SidebarTitle onClick={() => closePopup()}>
          <mark>AI</mark>Post
        </SidebarTitle>
        <img src={arrow_back} alt="arrow back" />
      </SidebarHead>
      <SidebarNavContainer>

      {menuItems.map((section, sectionIndex) => (
        <SidebarNav key={sectionIndex}>
          {section.title && <SidebarNavTitle>{section.title}</SidebarNavTitle>}
          <SidebarList>
            {section.items.map((item) => (
              <SidebarListItem
                key={item.id}
                $isActive={activePage === item.id}
                onClick={() => handleItemClick(item.id)}
              >
                 <Link to={item.to}>
                  <img 
                    src={activePage === item.id ? item.iconActive : item.icon} 
                    alt={`${item.text} icon`} 
                  />
                  {item.text}
                </Link>
              </SidebarListItem>
            ))}
          </SidebarList>
        </SidebarNav>
      ))}
      </SidebarNavContainer>

      <SidebarFooter>
        <SidebarFooterTop>
          <SidebarAvaContainer>
            <SidebarAva src={acc_icon} alt="accaunt icon" />
          </SidebarAvaContainer>
          <p>Arseniy P.</p>
        </SidebarFooterTop>
        <SidebarFooterBtn>+ Пополнить</SidebarFooterBtn>
      </SidebarFooter>
    </SidebarContainer>
  )
}

const SidebarContainer = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 24px 0 0 24px;
  padding: 40px 24px 32px;
  background: #121726;
  max-width: 240px;
  width: 100%;
  

  &::after {
    content: '';
    position: absolute;
    right: -50%;
    bottom: 180px;
    width: 200px;
    height: 250px;
    background: linear-gradient(
      to bottom,
      #5A9FFF,
      #EF6284,
      #5D2076
    );
    opacity: 0.4;
    filter: blur(100px);
    transform: rotate(180deg);
  }
  @media(max-width: 1400px) {
    display: none;
  }
`
const SidebarHead = styled.div`
  display: flex;
  justify-content: space-between;
`
const SidebarTitle = styled.h1`
  display: flex;
  gap: 10px;
  font-size: 18px;
  font-weight: 900;
  cursor: pointer;

  mark {
    color:#336CFF;
  }
`

const SidebarNavContainer = styled.div`
  overflow-y: auto;
  scrollbar-width: none;
`
const SidebarNav = styled.nav`
  margin-top: 65px;
`
const SidebarNavTitle = styled.h2`
  font-size: 12px;
  font-weight: 700;
  color: #6A7080;
  margin-bottom: 32px;
`
const SidebarList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 48px;
`
const SidebarListItem = styled.li`
  position: relative;
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.$isActive ? '#FFFFFF' : '#6A7080'};
  cursor: pointer;

  ${props => props.$isActive && `
    &::before {
      content: '';
      position: absolute;
      height: 24px;
      background-color: #336CFF;
      width: 2px;
      border-radius: 0 2px 2px 0;
      left: -23px;
    }
  `}

  a {
    display: flex;
    align-items: center;
    gap: 14px;
    color: inherit;
    text-decoration: none;
  }

  &:hover {
    color: #FFFFFF;
    
  }
`
const SidebarFooter = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: flex-end;
  gap: 32px;
  margin-top: 40px;
`
const SidebarFooterTop = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 14px;
  font-weight: 700;
`
const SidebarAvaContainer = styled.div`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    box-sizing: border-box;
    width: 10px;
    height: 10px;
    border: 2px solid #131826;
    background-color: #B5EC5B;
    top: 0;
    right: 0;
    border-radius: 50%;
  }
`
const SidebarAva = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 16px;
`
const SidebarFooterBtn = styled.button`
  background-color: #151F37;
  color: #336CFF;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
`
export default Sidebar