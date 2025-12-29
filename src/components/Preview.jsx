import styled from "styled-components";
import eye_blue from "@/assets/eye-blue.svg";
import PreviewBG from "@/assets/ai-generator/PreviewBG.png";
import arrow from "@/assets/arrow.svg";
import CustomSelect from "@/shared/CustomSelectSec";
import BtnBase from "@/shared/BtnBase";

const Preview = ({ collapsed, testResult }) => {
	const { title, summary, url, savedFiles } = testResult || {};

	return (
		<GeneratorPreview $collapsed={collapsed}>
			<PreviewContent>
				<PreviewHead>
					<HeadLeft><img src={eye_blue} alt="eye icon" />Лайв превью</HeadLeft>
					<HeadArrow src={arrow} alt="arrow icon" onClick={() => setCollapsed(prev => !prev)} $collapsed={collapsed} />
				</PreviewHead>
				{!collapsed && (
					<>
						<PreviewSelect>
							<CustomSelect
								placeholder="Все платформы"
								options={[
									{ value: "Telegram", label: "Telegram" },
								]}
								width="220px"
								fs="14px"
								padding="16px"
							/>
							<PreviewHeadButton>
								<BtnBase $padding="16px 24px">Telegram</BtnBase>
							</PreviewHeadButton>
						</PreviewSelect>
						<PreviewInfo>
							<PreviewInfoBG src={PreviewBG} alt="bg" />
							<PreviewInfoContainer>
									 {savedFiles?.images?.length > 0 && (
										<ImagesContainer>
											{savedFiles.images.map((img, index) => (
												<img key={index} src={img} alt={`image-${index}`} />
											))}
										</ImagesContainer>
									)}
									<PreviewInfoText>

									{title && <strong>{title}</strong>}<br /><br />
                  {summary}<br /><br />
									{url && (
										<a href={url} target="_blank" rel="noopener noreferrer">
											Источник: {url}
										</a>
									)}
								</PreviewInfoText>
								<BtnBase $padding="17px" $bg="#243D56" $color="#D6DCEC">🚀 Начать</BtnBase>
							</PreviewInfoContainer>
						</PreviewInfo>
						<PreviewButton>
							{/* <img src={text} alt="text icon" width={24} height={17} /> */}
							<p>Отправить в Telegram</p>
						</PreviewButton>
					</>
				)}
			</PreviewContent>
		</GeneratorPreview>
	)
}
const GeneratorPreview = styled.div`
  width: 100%;
	max-width: 800px;
`;
const PreviewContent = styled.div`
  background-color: #181E30;
  border-radius: 24px;
  padding: 32px;
`;
const PreviewHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`
const HeadLeft = styled.h2`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 24px;
  font-weight: 800;
`
const HeadArrow = styled.img`
  display: none;
  transform: rotate(90deg);
  cursor: pointer;
  transition: transform 0.3s ease;
  ${({ $collapsed }) => $collapsed && `transform: rotate(270deg);`}
  @media(max-width: 1400px) {
    display: block;
  }
`
const PreviewButton = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;

  p {
    font-size: 14px;
    font-weight: 700;
  }
`;
const PreviewSelect = styled.div`
  margin-top: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const PreviewHeadButton = styled.div`
  @media(max-width: 480px) {
    display: none;
  }
`
const PreviewInfo = styled.div`
  position: relative;
  margin-top: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const PreviewInfoBG = styled.img`
  position: absolute;
  border-radius: 24px;
  width: 100%;
  height: calc(100% + 46px);
  object-fit: cover;
`
const PreviewInfoContainer = styled.div`
  position: relative;
  width: calc(100% - 104px);
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 1;
  button {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  @media(max-width: 1600px) {
    width: calc(100% - 28px);
  } 
`
const ImagesContainer = styled.div`
	background-color: #131C22;
	padding: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 4px;
	border-radius: 16px;

  img {
    width: 100%;
		max-width: 250px;
    object-fit: cover;
    border-radius: 12px;
  }
`;
const PreviewInfoText = styled.p`
	box-sizing: border-box;
  padding: 24px;
  background-color: #131C22;
  border-radius: 24px;
	font-size: 12px;
  line-height: 16px;
  font-weight: 600;

`
export default Preview
