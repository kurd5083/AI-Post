import styled from "styled-components";
import { useLocation } from "react-router";
import { pageDatas } from "@/data/pageDatas";

const PageHead = ({ children }) => {
  const loacation = useLocation()
  const foundItem = pageDatas.find(elem => elem.path == loacation.pathname)

  return (
    <HeadContainer>
      <HeadIcon>{foundItem.icon}</HeadIcon>
      <HeadContent>
        <HeadInfo>
          <h2>{foundItem.title}</h2>
          <p>{foundItem.text}</p>
        </HeadInfo>
        {children}
      </HeadContent>
    </HeadContainer>
  )
}

const HeadContainer = styled.div`
  display: flex;
	justify-content: space-between;
  margin-top: 24px;
	padding: 0 56px;
	margin-bottom: 48px;
  gap: 24px;
  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
  @media(max-width: 480px) {
    margin-top: 0px;
  }
`
const HeadContent = styled.div`
  display: flex;
	align-items: center;
  flex-wrap: wrap;
  flex-grow: 1;
  gap: 24px 40px;
  button {
    flex-shrink: 0;
    @media(max-width: 480px) {
      margin-left: -51px;
    }
  }
`
const HeadIcon = styled.div`
  margin-top: 16px;
  @media(max-width: 480px) {
    margin-top: 4px;
  }
`
const HeadInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;

  h2 {
    font-size: 48px;
    line-height: 48px;
    font-weight: 700;
    @media(max-width: 480px) {
      font-size: 32px;
      line-height: 32px;
    }
  }
  
	p {
    color: #6A7080;
    font-size: 14px;
    font-weight: 700;
    @media(max-width: 480px) {
      margin-left: -51px;
    }
  }
`
export default PageHead
