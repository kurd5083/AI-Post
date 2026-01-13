import styled from "styled-components";
import Preview from "@/components/Preview";
import { usePopupStore } from "@/store/popupStore";

const LivePreviewPopup = () => {
	const { popup } = usePopupStore();
	const selectedPost = popup?.data?.selectedPost;

	return (
		<PreviewContainer>
			<Preview testResult={selectedPost} view={false}/>
		</PreviewContainer>
	)
}
const PreviewContainer = styled.div`
	padding: 0 56px 30px;

  @media (max-width: 1600px) {
    padding: 0 32px 30px;
  }
  @media (max-width: 768px) {
    padding: 0 24px 30px;
  }
`

export default LivePreviewPopup
