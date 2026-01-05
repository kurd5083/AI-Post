import { Link } from "react-router";
import styled from "styled-components";
import { sidebarDatas } from "@/data/sidebarDatas";
import arrow_close from "@/assets/arrow-close.svg";
import { usePopupStore } from "@/store/popupStore";
import { useSidebarStore } from "@/store/sidebarStore";
import { useUser } from "@/lib/useUser";
import { useTelegramBotLink } from "@/lib/useTelegramBotLink";
import BtnBase from "@/shared/BtnBase";
import TgIcon from "@/icons/TgIcon";

const Sidebar = () => {
  const { openPopup, closePopup } = usePopupStore()
  const { user } = useUser();

  const { botLinkData } = useTelegramBotLink();
  const {
    activePage,
    setActivePage,
    isSidebarVisible,
    hideSidebar,
    showSidebar
  } = useSidebarStore();

  const isAuthorized = !!localStorage.getItem("accessToken");

  return (
    <SidebarContainer $isSidebarVisible={isSidebarVisible}>
      <SidebarHead $isSidebarVisible={isSidebarVisible}>
        <SidebarTitle>
          <mark>AI</mark>{isSidebarVisible && 'Post'}
        </SidebarTitle>
        <SidebarClose $isSidebarVisible={isSidebarVisible} src={arrow_close} alt="arrow close" onClick={() => isSidebarVisible ? hideSidebar() : showSidebar()} />
      </SidebarHead>
      <SidebarNavContainer $isSidebarVisible={isSidebarVisible}>
        {sidebarDatas.map((section, sectionIndex) => (
          <SidebarNav key={sectionIndex}>
            {section.title && <SidebarNavTitle>{section.title}</SidebarNavTitle>}
            <SidebarList>
              {section.items.map((item) => (
                <SidebarListItem
                  key={item.id}
                  $isActive={activePage === item.id}
                  $isSidebarVisible={isSidebarVisible}
                  onClick={() => {
                    setActivePage(item.id)
                  }}
                >
                  {item.to ? (
                    <Link
                      to={item.to}
                      onClick={() => {
                        closePopup()
                      }}
                    >
                      {item.icon(activePage === item.id)}
                      {isSidebarVisible && item.text}
                    </Link>
                  ) : (
                    <p onClick={() => openPopup(item.popup)}>
                      {item.icon(activePage === item.id)}
                      {isSidebarVisible && item.text}
                    </p>
                  )}
                </SidebarListItem>
              ))}
            </SidebarList>
          </SidebarNav>
        ))}
      </SidebarNavContainer>
      <SidebarFooter $isSidebarVisible={isSidebarVisible}>
        {isAuthorized ? (
          <SidebarFooterTop onClick={() => {
            openPopup("profile")
            setActivePage(6);
          }}>
            <SidebarAvaContainer>
              <SidebarAva src={user?.avatarUrl} alt={user?.username} />
            </SidebarAvaContainer>
            {isSidebarVisible && <p>{user?.firstName} {user?.lastName}</p>}
          </SidebarFooterTop>
        ) : (
          <SidebarFooterBtn>
            <BtnBase
              $padding="6px 12px"
              $bg="#54a9eb"
              $color="#fff"
              $radius="20px"
              onClick={() => {
              if (!botLinkData) return;
                window.location.href = botLinkData.botLink;
              }}
            >
              <TgIcon width="22" height="20" />
              Войти через бот
            </BtnBase>
          </SidebarFooterBtn>
        )}
        <SidebarFooterBtn>
          <BtnBase
            $padding="12px 24px"
            $bg="#151F37"
            $color="#336CFF"
            onClick={() => openPopup("replenish")}
          >
            + {isSidebarVisible && 'Пополнить'}
          </BtnBase>
        </SidebarFooterBtn>
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
  padding: 40px 0 32px;
  background: #131826;
  max-width: ${({ $isSidebarVisible }) => $isSidebarVisible ? '240px' : '116px'};
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
  padding: 0 24px;
`
const SidebarTitle = styled.h1`
  display: flex;
  gap: 10px;
  font-size: 18px;
  font-weight: 900;

  mark {
    color:#336CFF;
  }
`
const SidebarClose = styled.img`
  cursor: pointer;
  transform: rotate(${({ $isSidebarVisible }) => $isSidebarVisible ? '0deg' : '180deg'});
`

const SidebarNavContainer = styled.div`
  position: relative;
  overflow-y: auto;
  scrollbar-width: none;
  z-index: 1;
  padding: 0 ${({ $isSidebarVisible }) => $isSidebarVisible ? '24px' : '40px'};
`
const SidebarNav = styled.nav`
  margin-top: 65px;
`
const SidebarNavTitle = styled.h2`
  font-size: 12px;
  font-weight: 700;
  color: #6A7080;
  margin-bottom: 32px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
      left: ${props.$isSidebarVisible ? '-23px' : '-40px'};
    }
  `}

  a, p {
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
  padding: 0 ${({ $isSidebarVisible }) => $isSidebarVisible ? '24px' : '40px'};
`
const SidebarFooterTop = styled.div`
  cursor: pointer;
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
const SidebarFooterBtn = styled.div`
  button {
    width: 100%;
  }
`
export default Sidebar