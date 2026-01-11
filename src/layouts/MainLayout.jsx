import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router";
import styled from "styled-components";

import Sidebar from "@/components/Sidebar";
import Tape from "@/components/Tape";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Notification from "@/components/Notification";
import Lightbox from "@/components/Lightbox";
import Popup from "@/components/Popup/Popup";

import { usePopupStore } from "@/store/popupStore";
import { useLightboxStore } from "@/store/lightboxStore";
import { useAuthStore } from "@/store/authStore";

import BtnBase from "@/shared/BtnBase";
import TgIcon from "@/icons/TgIcon";
import { useTelegramBotLink } from "@/lib/useTelegramBotLink";


const MainLayout = () => {
  const { popup, closePopup } = usePopupStore();
  const { isOpen } = useLightboxStore();
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const token = useAuthStore(s => s.token);
  const init = useAuthStore(state => state.init);
  const { botLinkData } = useTelegramBotLink();
  const location = useLocation();

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    closePopup();
  }, [location.pathname, token, isAuthenticated]);

  return (
    <MainContainer>
      <Sidebar />
      <Main $blocked={!isAuthenticated || popup?.status}>
        <Header />
        {!isAuthenticated ? (
          <AuthOverlay>
              <h2>Войдите в систему</h2>
              <p>Чтобы продолжить работу, авторизуйтесь через Telegram-бота.</p>
           
              <BtnBase
                $padding="12px 24px"
                $bg="#336CFF"
                $color="#fff"
                $radius="12px"
                $fs="16px"
                onClick={() => {
                if (!botLinkData) return;
                  window.location.href = botLinkData.botLink;
                }}
              >
              <TgIcon width="22" height="20" />
              Войти через бот
            </BtnBase>
          </AuthOverlay>
        ) : (
          <Outlet />
        )}
        <MobileMenu />
        {popup && (
          popup.view === 'popup_window'
            ? <Popup content={popup.content} />
            : <Popup content={popup.content} />
        )}

        {isOpen && <Lightbox />}
        <Notification />
      </Main>
      <Tape />
    </MainContainer>
  );
};

const MainContainer = styled.section`
  display: flex;
  max-height: 100dvh;
  @media(max-width: 1400px) {
    flex-direction: column;
    max-height: fit-content;
  }
`;
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
`;
const AuthOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: #1C2438;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  h2 {
    font-size: 24px;
    margin-bottom: 16px;
  }

  p {
    margin-bottom: 24px;
    color: #6A7080;
  }
`;

export default MainLayout;