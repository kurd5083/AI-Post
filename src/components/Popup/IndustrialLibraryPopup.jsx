import styled from "styled-components";
import Checkbox from "@/shared/Checkbox";
import { industrialLibraryDatas } from "@/data/industrialLibraryDatas";
import BtnBase from "@/shared/BtnBase";
import { usePromptLibrary } from "@/lib/channels/usePromptLibrary";
import { useUpdateChannelGlobalPrompt } from "@/lib/channels/global-prompt/useUpdateChannelGlobalPrompt";
import { usePopupStore } from "@/store/popupStore"

const IndustrialLibraryPopup = () => {
  const { popup } = usePopupStore();
  const channelId = popup?.data?.channelId;
  const { promptLibrary } = usePromptLibrary();
  console.log(promptLibrary)
  const { mutate: updateGlobalPrompt } = useUpdateChannelGlobalPrompt();

  const handleSave = () => {
    updateGlobalPrompt({ channelId, value: localPrompt });
  };
  
	return (
		<IndustrialStyleContainer>
			{industrialLibraryDatas.map((item, index) => (
				<IndustrialLibraryContentItem key={index}>
					<Checkbox>
						<div>
							<h4>{item.title}</h4>
							<p>{item.desc}</p>
						</div>
					</Checkbox>
				</IndustrialLibraryContentItem>
			))}
			<BtnBase $color="#336CFF" $bg="#1B243E" $margin="64">Сохранить</BtnBase>
		</IndustrialStyleContainer>
	)
}
const IndustrialStyleContainer = styled.div`
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
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
