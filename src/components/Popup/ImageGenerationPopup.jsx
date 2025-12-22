import styled from "styled-components";
import Checkbox from "@/shared/Checkbox";
import { useImagePresets } from "@/lib/channels/useImagePresets";

const ImageGenerationPopup = () => {
  const { imagePresets } = useImagePresets();
  console.log(imagePresets)
	return (
		<ImageGenerationContent>
			<ImageGenerationContentTitle>Выберите одну стилистику</ImageGenerationContentTitle>
			<div>
				{imagePresets?.map((item) => (
					<ImageGenerationContentItem key={item.id}>
						<Checkbox
              checked={item.isActive}
              // onChange={() => toggleDay(day.value)}
            >
							<div>
								<h4>{item.name}</h4>
								<p>{item.description}</p>
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
  padding: 0 56px;
    
  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
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
