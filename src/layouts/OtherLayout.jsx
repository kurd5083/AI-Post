import { Outlet } from "react-router"
import styled from "styled-components";
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header";
import Popup from "@/components/Popup/Popup"
import { usePopupStore } from "@/store/popupStore";

const OtherLayout = () => {
  const { popup } = usePopupStore();
  return (
    <OtherContainer>
      <Sidebar/>
      <Main $blocked={popup?.status}>
        <Header/>
        <Outlet />
        {popup && <Popup content={popup.content}/>}
      </Main>
    </OtherContainer>
  )
}
const OtherContainer = styled.section`
  position: relative;
  display: flex;
  max-height: 100svh;

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
  padding-bottom: 32px;

  @media(max-width: 1600px) {
    padding: 0;
  }
`
export default OtherLayout