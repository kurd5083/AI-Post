import styled from "styled-components";
import arrow from "@/assets/arrow.svg";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore"

const CompilationPopup = () => {
  const { changeContent } = usePopupStore()
  const compilation = [
    {
      text: "Спорт",
      subtext: "Качественные источники для вашего канала с релевантным контентом",
      sourcesCount: 2
    },
    {
      text: "Новости",
      subtext: "Актуальные новостные агрегаторы для вашего канала",
      sourcesCount: 5
    },
    {
      text: "Технологии",
      subtext: "Свежие статьи и обзоры из мира IT и гаджетов",
      sourcesCount: 3
    },
    {
      text: "Финансы",
      subtext: "Курсы валют, биржевые сводки и финансовые аналитика",
      sourcesCount: 4
    }
  ]

  return (
    <CompilationContainer>
      <CompilationList>
        {compilation.map((item, index) => (
          <CompilationItem key={index}>
            <CompilationText>{item.text}</CompilationText>
            <CompilationSubtext>{item.subtext}</CompilationSubtext>
            <CompilationFooter>
              <p>{item.sourcesCount} источника</p>
              <CompilationOpen onClick={() => changeContent('compilation_upload', item.text, 'Здесь вы можете добавить свой источник')}>
                <img src={arrow} alt="arrow icon" />
              </CompilationOpen>
            </CompilationFooter>
          </CompilationItem>
        ))}
      </CompilationList>
      <BtnBase $margin="64">Сохранить</BtnBase>
    </CompilationContainer>
  )
}

const CompilationContainer = styled.div`
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`;
const CompilationList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-template-rows: max-content;
  gap: 16px;
`;
const CompilationFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  p {
    font-size: 14px;
    font-weight: 700;
    color: #336CFF;
  }
`
const CompilationOpen = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
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
  background-color:#181E30;

  &:hover {
    background-color: #1C2438;
    
    ${CompilationOpen} {
      background-color: #336CFF;

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
  padding-bottom: 24px;
  border-bottom: 2px solid #2E3954;
`

export default CompilationPopup