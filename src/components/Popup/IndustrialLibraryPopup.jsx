import styled from "styled-components";
import Checkbox from "@/shared/Checkbox";
import { industriallibrary } from "@/data/industriallibrary";
import BtnBase from "@/shared/BtnBase";

const IndustrialLibraryPopup = () => {
    return (
        <IndustrialLibraryContent>
                {industriallibrary.map((item, index) => (
                    <IndustrialLibraryContentItem key={index}>
                        <Checkbox>
                            <div>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        </Checkbox>
                    </IndustrialLibraryContentItem>
                ))}
            <BtnBase $color="#336CFF" $bg="#1B243E">Сохранить</BtnBase>
        </IndustrialLibraryContent>
    )
}
const IndustrialLibraryContent = styled.div`
`

const IndustrialLibraryContentItem = styled.div`
    display: flex;
    padding: 24px 0;
    border-bottom: 2px solid #2E3954;

    &:first-child {
        padding-top: 0;
    }
    
    &:last-of-type  {
        padding-bottom: 0;
        border-bottom: 0;
    }

    h4 {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 16px;
    }
    
    p {
        font-size: 14px;
        font-weight: 600;
        color: #6A7080;
    }
`

export default IndustrialLibraryPopup
