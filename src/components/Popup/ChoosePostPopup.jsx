import styled from "styled-components";
import CardСhoose from "@/components/CardСhoose";
import { publicationsDatas } from "@/data/publicationsDatas";
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore";

const ChoosePostPopup = () => {
  const { goBack } = usePopupStore()

	return (
		<ChooseContainer>
			<ChooseList>
				{publicationsDatas.map((item, index) => (
					<CardСhoose key={index} item={item} bg={true} />
				))}
			</ChooseList>
			<ChooseButtons>
				<BtnBase $color="#D6DCEC" $bg="#336CFF">Опубликовать</BtnBase>
				<BtnBase $color="#D6DCEC" $bg="#242A3A" onClick={goBack}>Отменить</BtnBase>
			</ChooseButtons>
		</ChooseContainer>
	)
}

const ChooseContainer = styled.div`
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`;
const ChooseList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, min-content));
  grid-template-rows: max-content;
  gap: 16px;
`;
const ChooseButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 64px;
`

export default ChoosePostPopup