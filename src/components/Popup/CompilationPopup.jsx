import styled from "styled-components";
import arrow from "@/assets/arrow.svg";
import BtnSave from "@/shared/BtnSave";

const CompilationPopup = () => {
  return (
    <>
      <CompilationList>
        <CompilationItem>
          <CompilationText>IT</CompilationText>
          <CompilationSubtext>Качественные источники для вашего канала с релевантным контентом</CompilationSubtext>
          <CompilationOpen>
            <img src={arrow} alt="arrow icon" />
          </CompilationOpen>
        </CompilationItem>
      </CompilationList>
      <BtnSave>Сохранить</BtnSave>
    </>
  )
}
const CompilationList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, min-content));
  grid-template-rows: max-content;
`;
const CompilationOpen = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: absolute;
  bottom: 24px;
  right: 24px;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  border: 2px solid #1C2438;
`
const CompilationItem = styled.div`
  position: relative; 
  box-sizing: border-box;
  padding: 24px;
  border-radius: 24px;
  background-color:#181F30;
  min-height: 176px;

  &:hover {
    background-color: #181F30;
    
    ${CompilationOpen} {
      background-color: #1C2438;

      svg path {
        stroke: #D6DCEC; 
      }
    }
  }
`
const CompilationText = styled.p`
  font-size: 24px;
  line-height: 24px;
  font-weight: 700;
  padding-right: 40px;
`
const CompilationSubtext = styled.p`
  margin-top: 16px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
  color: #6A7080;
  max-width: 240px;
`

export default CompilationPopup
