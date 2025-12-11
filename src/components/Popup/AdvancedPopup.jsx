import styled from "styled-components";
import { advancedDatas } from "@/data/advancedDatas";
import Checkbox from "@/shared/Checkbox";

const AdvancedPopup = () => {
	return (
		<AdvancedContent>
			{advancedDatas.map((item, index) => (
				<AdvancedContentItem key={index}>
					<AdvancedIcon src={item.extra.image} alt={`${item.key} icon`} width={40} height={40} style={{ background: item.extra.background }} />
					<ItemText>
						<h4>{item.title}</h4>
						<p>{item.desc}</p>
					</ItemText>
					<Checkbox color="#FFF980" />
				</AdvancedContentItem>
			))}
		</AdvancedContent>
	)
}
const AdvancedContent = styled.div`
  display: flex;
  flex-direction: column;
`
const AdvancedContentItem = styled.div`
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
const AdvancedIcon = styled.img`
  box-sizing: border-box;
  border-radius: 8px;
  padding: 10px;
  margin-top: 6px;

  @media(max-width: 480px) {
		position: absolute;
    margin-top: 0;
  }
`
export default AdvancedPopup
