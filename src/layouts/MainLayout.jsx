import { Outlet } from "react-router"
import styled from "styled-components";

import Sidebar from "@/components/Sidebar"
import Tape from "@/components/Tape"
import Header from "@/components/Header";

const MainLayout = () => {
  return (
    <MainContainer>
      <Sidebar/>
      <Main>
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

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 80px;
    right: 80px;
    background-color: #131826;
    z-index: -1;
    filter: blur(80px);
  }
`
const Main = styled.main`
  position: relative;
  box-sizing: border-box;
  background-color: #131826;
  max-width: 1240px;
  width: 100%;
  padding: 0 32px;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 135px;
    width: 100%;
    background: linear-gradient(to top, #131826, #13182600);
    backdrop-filter: blur(8px);
    mask-image: linear-gradient(to top, black 50%, transparent);
  }
`
export default MainLayout
