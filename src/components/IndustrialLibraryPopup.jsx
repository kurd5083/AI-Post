import styled from "styled-components";
import Checkbox from "@/shared/Checkbox";
import { industriallibrary } from "@/data/industriallibrary";

const IndustrialLibraryPopup = () => {
    return (
        <IndustrialLibraryContent>
            <IndustrialLibraryContentTitle>Выберите одну стилистику</IndustrialLibraryContentTitle>
            <div>
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
            </div>
            <IndustrialLibraryBtn>Сохранить </IndustrialLibraryBtn>
        </IndustrialLibraryContent>
    )
}
const IndustrialLibraryContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`
const IndustrialLibraryContentTitle = styled.h3`
    font-size: 12px;
    font-weight: 700;
    color: #6A7080;
`
const IndustrialLibraryContentItem = styled.div`
    display: flex;
    padding: 24px 0;
    border-bottom: 2px solid #2E3954;

    &:first-child {
        padding-top: 0;
    }
    
    &:last-child {
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
const IndustrialLibraryBtn = styled.button`
    padding: 21px 32px;
    border-radius: 12px;
    color: #336CFF;
    background-color: #1B243E;
    font-weight: 700;
    font-size: 14px;
    max-width: 147px;
`
export default IndustrialLibraryPopup
