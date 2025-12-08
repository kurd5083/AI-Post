import styled from "styled-components";
import { useLocation } from "react-router";
import { pagedata } from "@/data/pagedata";

const PageHead = ({children}) => {
  const loacation = useLocation()
	const foundItem = pagedata.find(elem => elem.path == loacation.pathname)

  return (
    <HeadContainer>
			<HeadContent>
      <HeadIcon src={foundItem.image} alt="analytics icon" width={21} height={24}/>
      <HeadInfo>
        <h2>{foundItem.title}</h2>
        <p>{foundItem.text}</p>
      </HeadInfo>
			</HeadContent>
			{children}
    </HeadContainer>
  )
}

const HeadContainer = styled.div`
  display: flex;
	justify-content: space-between;
	align-items: center;
  margin-top: 60px;
	padding: 0 clamp(0px, calc((100vw - 1600px) * 24 / 400), 24px);
	margin-bottom: 48px;
`
const HeadContent = styled.div`
  display: flex;
  gap: 27px;
`
const HeadIcon = styled.img`
  margin-top: 16px;
`
const HeadInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    font-size: 48px;
    line-height: 48px;
    font-weight: 700;
  }
  
	p {
    color: #6A7080;
    font-size: 14px;
    font-weight: 700;
  }
`
export default PageHead
 