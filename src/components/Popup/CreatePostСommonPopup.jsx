import styled from "styled-components";
import { usePopupStore } from "@/store/popupStore"
import { createPostCommonDatas } from "@/data/createPostCommonDatas";

const CreatePostСommonPopup = () => {
	const { changeContent } = usePopupStore()
	return (
		<PostСommonContainer>
			<PostСommonSubitle>ОПУБЛИКОВАТЬ 23.09.2026</PostСommonSubitle>
			{createPostCommonDatas.map((item, index) => (
				<PostСommonContent key={index} onClick={() => changeContent(item.key)}>
					<PostСommonImg src={item.extra.image} alt={item.title} width={24} height={24} style={{ background: item.extra.background }} />
					<PostСommonText>
						<h4>{item.title}</h4>
						<p>{item.desc}</p>
					</PostСommonText>
				</PostСommonContent>
			))}
		</PostСommonContainer>
	);
};

const PostСommonContainer = styled.div`
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`
const PostСommonSubitle = styled.span`
  text-transform: uppercase;
  color: #6A7080;
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 33px;
`
const PostСommonContent = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px 0;
  border-bottom: 2px solid #2E3954;
  cursor: pointer;

  &:first-child {
    padding-top: 0;
  }
    
  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }
`
const PostСommonImg = styled.img`
  box-sizing: content-box;
  padding: 8px;
  border-radius: 8px;
`
const PostСommonText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h4 {
    font-size: 24px;
    font-weight: 700;
  }
    
  p {
    font-size: 14px;
    font-weight: 600;
    color: #6A7080;
  }
`

export default CreatePostСommonPopup