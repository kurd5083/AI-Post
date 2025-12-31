import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router"
import styled from "styled-components";
import Sidebar from "@/components/Sidebar"
import Tape from "@/components/Tape"
import Header from "@/components/Header";
import Popup from "@/components/Popup/Popup"
import PopupWindow from '@/components/PopupWindow/PopupWindow';
import MobileMenu from "@/components/MobileMenu";
import Lightbox from "@/components/Lightbox";
import { usePopupStore } from "@/store/popupStore";
import { useLightboxStore } from "@/store/lightboxStore";

const MainLayout = () => {
  const { popup, closePopup } = usePopupStore();
  const { isOpen } = useLightboxStore();
  const location = useLocation();

  useEffect(() => {
    closePopup();
  }, [location.pathname]);

  return (
    <MainContainer>
      <Sidebar />
      <Main $blocked={popup?.status}>
        <Header />
        <Outlet />
        <MobileMenu />
        {popup && (
          popup.view === 'popup_window'
            ? <PopupWindow content={popup.content} />
            : <Popup content={popup.content} />
        )}
         {isOpen && (
          <Lightbox/>
        )}
      </Main>
      <Tape />
    </MainContainer>
  )
}
const MainContainer = styled.section`
  display: flex;
  max-height: 100dvh;
  @media(max-width: 1400px) {
    flex-direction: column;
    max-height: fit-content;
  }
`
const Main = styled.main`
  position: relative;
  box-sizing: border-box;
  background-color: #131826;
  flex: 1;
  min-width: 0;
  z-index: 1;
  overflow-y: ${({ $blocked }) => ($blocked ? "clip" : "auto")};
  overflow-x: clip;
  scrollbar-width: none;
  @media(max-width: 1600px) {
    padding: 0;
  }
  @media(max-width: 1400px) {
    position: static;
  }
`
export default MainLayout
