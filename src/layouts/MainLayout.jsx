import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router";
import styled from "styled-components";

import TgIcon from "@/icons/TgIcon";

import BtnBase from "@/shared/BtnBase";
import Sidebar from "@/components/Sidebar";
import Tape from "@/components/Tape";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Notification from "@/components/Notification";
import Lightbox from "@/components/Lightbox";
import Popup from "@/components/Popup/Popup";
import PopupWindow from "@/components/PopupWindow/PopupWindow";

import { useTelegramBotLink } from "@/lib/user/useTelegramBotLink";
import { useAuthEmail } from "@/lib/user/useAuthEmail";

import { usePopupStore } from "@/store/popupStore";
import { useLightboxStore } from "@/store/lightboxStore";
import { useAuthStore } from "@/store/authStore";
import useSearchStore from "@/store/searchStore";

const MainLayout = () => {
  const { popup, openPopup } = usePopupStore();
  const { isOpen } = useLightboxStore();

  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const isInitialized = useAuthStore(s => s.isInitialized);
  const init = useAuthStore(state => state.init);

  const { botLinkData } = useTelegramBotLink();
  const clearSearch = useSearchStore(s => s.clearSearch);
  const { register, login, isRegistering, isLoggingIn } = useAuthEmail();
  const location = useLocation();
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    clearSearch();
  }, [location.pathname]);

  useEffect(() => {
    if (location.state?.openPostPopup && location.state?.postId) {
      openPopup('create_post', 'popup');
      window.history.replaceState({}, document.title);
    }
  }, [location.state?.openPostPopup, location.state?.postId, openPopup]);

  if (!isInitialized) {
    return <p>Загрузка...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (authMode === 'register') {
        if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
          setError('Заполните все поля');
          return;
        }
        await register(formData);
        setFormData({ email: '', password: '', firstName: '', lastName: '' });
      } else {
        if (!formData.email || !formData.password) {
          setError('Заполните email и пароль');
          return;
        }
        await login({ email: formData.email, password: formData.password });
        setFormData({ email: '', password: '', firstName: '', lastName: '' });
      }
    } catch (err) {
      setError(err.message || (authMode === 'register' ? 'Ошибка регистрации' : 'Ошибка входа'));
    }
  };

  return (
    <MainContainer>
      <Sidebar />
      <Main $blocked={!isAuthenticated || popup?.status}>
        <Header />
        {!isAuthenticated ? (
          <AuthOverlay>
            <AuthFormContainer>
              <AuthTabs>
                <AuthTab 
                  $active={authMode === 'login'} 
                  onClick={() => {
                    setAuthMode('login');
                    setError('');
                  }}
                >
                  Вход
                </AuthTab>
                <AuthTab 
                  $active={authMode === 'register'} 
                  onClick={() => {
                    setAuthMode('register');
                    setError('');
                  }}
                >
                  Регистрация
                </AuthTab>
              </AuthTabs>

              <AuthForm onSubmit={handleSubmit}>
                {authMode === 'register' && (
                  <>
                    <AuthInput
                      type="text"
                      placeholder="Имя"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                    <AuthInput
                      type="text"
                      placeholder="Фамилия"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </>
                )}
                <AuthInput
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <AuthInput
                  type="password"
                  placeholder="Пароль"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                
                {error && <AuthError>{error}</AuthError>}

                <BtnBase
                  type="submit"
                  $padding="12px 24px"
                  $bg="#336CFF"
                  $color="#fff"
                  $radius="12px"
                  $fs="16px"
                  disabled={isRegistering || isLoggingIn}
                >
                  {authMode === 'register' 
                    ? (isRegistering ? 'Регистрация...' : 'Зарегистрироваться')
                    : (isLoggingIn ? 'Вход...' : 'Войти')
                  }
                </BtnBase>
              </AuthForm>

              <AuthDivider>
                <AuthDividerLine />
                <AuthDividerText>или</AuthDividerText>
                <AuthDividerLine />
              </AuthDivider>

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
            </AuthFormContainer>
          </AuthOverlay>
        ) : (
          <Outlet />
        )}
        <MobileMenu />
        {popup && (
          popup.view === 'popup_window'
            ? <PopupWindow content={popup.content} />
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
  /* z-index: 1; */
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
  padding: 0 20px;
`;

const AuthFormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const AuthTabs = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #2E3954;
`;

const AuthTab = styled.button`
  flex: 1;
  padding: 12px;
  background: transparent;
  border: none;
  color: ${({ $active }) => ($active ? '#336CFF' : '#6A7080')};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid ${({ $active }) => ($active ? '#336CFF' : 'transparent')};
  margin-bottom: -2px;
  transition: all 0.2s;

  &:hover {
    color: #336CFF;
  }
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AuthInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  background-color: #131826;
  border: 2px solid #2E3954;
  border-radius: 12px;
  color: #D6DCEC;
  font-size: 16px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #336CFF;
  }

  &::placeholder {
    color: #6A7080;
  }
`;

const AuthError = styled.p`
  color: #FF4444;
  font-size: 14px;
  text-align: center;
  margin: 0;
`;

const AuthDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const AuthDividerLine = styled.div`
  flex: 1;
  height: 1px;
  background-color: #2E3954;
`;

const AuthDividerText = styled.span`
  color: #6A7080;
  font-size: 14px;
`;

export default MainLayout;