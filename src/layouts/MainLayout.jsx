import { Outlet } from "react-router"
import styled from "styled-components";
import Sidebar from "@/components/Sidebar"
import Tape from "@/components/Tape"
import Header from "@/components/Header";
import { usePopupStore } from "@/store/popupStore";

const MainLayout = () => {
  const { popup } = usePopupStore();
  return (
    <MainContainer>
      <Sidebar/>
      <Main $blocked={popup?.status}>
        <Header/>
        <Outlet />
      </Main>
      <Tape/>
    </MainContainer>
  )
}
const MainContainer = styled.section`
  position: relative;
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
  padding: 0 32px;
  z-index: 1;
  overflow-y: ${({ $blocked }) => ($blocked ? "clip" : "auto")};
  scrollbar-width: none;
  @media(max-width: 1600px) {
    padding: 0;
  }
`
export default MainLayout
