import styled from "styled-components";
import Checkbox from "@/shared/Checkbox";
import { imagegeneration } from "@/data/imagegeneration";
const ImageGenerationPopup = () => {
    return (
        <ImageGenerationContent>
            <ImageGenerationContentTitle>Выберите одну стилистику</ImageGenerationContentTitle>
            <div>
                {imagegeneration.map((item, index) => (
                    <ImageGenerationContentItem key={index}>
                        <Checkbox>
                            <div>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        </Checkbox>
                    </ImageGenerationContentItem>
                ))}
            </div>
        </ImageGenerationContent>
    )
}
const ImageGenerationContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`
const ImageGenerationContentTitle = styled.h3`
    font-size: 12px;
    font-weight: 700;
    color: #6A7080;
`
const ImageGenerationContentItem = styled.div`
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

export default ImageGenerationPopup
