import styled from "styled-components";
import fire from "@/assets/tape/fire.svg";
import filter from "@/assets/tape/filter.svg";
import TapeList from "@/components/TapeList";

const Tape = () => {
  return (
    <TapeContainer>
      <TapeHead>
        <TapeTitle>
          <img src={fire} alt="fire icon" />
          <mark>Лайв</mark> лента
        </TapeTitle>
        <TapeBtn>
          <img src={filter} alt="filter icon" />
          Фильтр
        </TapeBtn>
      </TapeHead>
      <TapeList/>
    </TapeContainer>
  );
};

const TapeContainer = styled.section`
  box-sizing: border-box;
  position: relative;
  padding: 40px 24px 32px;
  background: #121726;
  max-width: 430px;
  padding: 35px 43px 0 0;
  overflow: hidden;

  @media (max-width: 1600px) {
    max-width: 370px;
  }
  @media(max-width: 1400px) {
    max-width: 100%;
    padding: 32px 0;
  }
  &::after {
    content: '';
    position: absolute;
    right: -100px;
    top: -150px;
    width: 200px;   
    height: 200px;
    background: #1844C2;
  	filter: blur(60px);
    @media(max-width: 1400px) {
      display: none;
    }
  }
`
const TapeHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media (max-width: 1400px) {
    padding: 0 32px;
  }
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 0 24px;
  }
`
const TapeTitle = styled.h1`
  display: flex;
  flex-direction: column;
  line-height: 48px;
  font-size: 48px;
  font-weight: 900;
  @media (max-width: 480px) {
    flex-direction: row;
    gap: 16px;
		align-items: center;
    line-height: 40px;
    font-size: 40px;
  }
  img {
    width: 25px;
    height: 32px;
    margin-bottom: 20px;
		@media (max-width: 480px) {
			margin-bottom: 0px;
		}
  }
  
  mark {
    position: relative;
    color: transparent;
    background: radial-gradient(circle, #FFBD5A, #EF6284, #5D2076, #5B1F74);
    background-size: 250px;
    background-position: -30px;
    background-clip: text;
  }
`
const TapeBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: #1A1F2D;
  padding: 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #6A7080;
`

export default Tape
