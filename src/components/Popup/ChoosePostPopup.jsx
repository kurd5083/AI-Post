import styled from "styled-components";
import CardСhoose from "@/components/CardСhoose";
import { publicationsData } from "@/data/publicationsData";
import BtnBase from "@/shared/BtnBase";

const ChoosePostPopup = () => {
    return (
        <>
            <ChooseList>
                {publicationsData.map((item, index) => (
                    <CardСhoose key={index} item={item} bg={true} />
                ))}
            </ChooseList>
            <ChooseButtons>
                <BtnBase $color="#D6DCEC" $bg="#336CFF">Опубликовать</BtnBase>
                <BtnBase $color="#D6DCEC" $bg="#242A3A">Отменить</BtnBase>
            </ChooseButtons>
        </>

    )
}
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
