import styled from "styled-components";
import { advancedDatas } from "@/data/advancedDatas";
import Checkbox from "@/shared/Checkbox";

const AdvancedPopup = () => {
  return (
    <AdvancedContainer>
      {advancedDatas.map((item, index) => (
        <AdvancedItem key={index}>
          <AdvancedIcon $bg={item.extra.background}>
            {item.extra.image ? (
              <img src={item.extra.image} alt={`advanced icon`} />
            ) : (
              <>
                {item.extra.icon}
              </>
            )}
          </AdvancedIcon>
          <ItemText>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </ItemText>
          <Checkbox color="#FFF980" />
        </AdvancedItem>
      ))}
    </AdvancedContainer>
  )
}
const AdvancedContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`
const AdvancedItem = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px 0;
  border-bottom: 2px solid #2E3954;

  &:first-child {
    padding-top: 0;
  }
    
  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }
`
const ItemText = styled.div`
  flex-grow: 1;

	h4 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
		@media(max-width: 480px) {
			font-size: 16px;
			padding-left: 64px;
			height: 40px;
			margin-bottom: 24px;
		}
  }
    
  p {
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    color: #6A7080;
    max-width: 560px;
		@media(max-width: 480px) {
			max-width: calc(100% + 64px);
			width: calc(100% + 64px);
		}
  }
`
const AdvancedIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-top: 6px;
  background-color: ${({ $bg }) => $bg};

  @media(max-width: 480px) {
		position: absolute;
    margin-top: 0;
  }

`
export default AdvancedPopup
