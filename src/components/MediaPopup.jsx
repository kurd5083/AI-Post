import { useState } from "react";
import styled from "styled-components";

import ImageIcon from "@/icons/ImageIcon";
import VideoIcon from "@/icons/VideoIcon"; 

import ModernLoading from "@/components/ModernLoading";

import { useGetMediaLibrary } from "@/lib/mediaLibrary/useGetMediaLibrary";

const MediaPopup = () => {
	const { mediaItems, mediaLoading } = useGetMediaLibrary();
	
	const [activeTab, setActiveTab] = useState("photo");

	console.log(mediaItems)
	return (
		<MediaContainer>
			<MediaNav>
				<NavText $active={activeTab === "photo"} onClick={() => setActiveTab("photo")}>
          <ImageIcon color={activeTab === "photo" ? "#336CFF" : "#6A7080"} hoverColor={activeTab === "photo" ? "#336CFF" : "#6A7080"} />
          Фото
        </NavText>
        <NavText $active={activeTab === "video"} onClick={() => setActiveTab("video")}>
          <VideoIcon color={activeTab === "video" ? "#336CFF" : "#6A7080"} hoverColor={activeTab === "video" ? "#336CFF" : "#6A7080"} />
          Видео
        </NavText>
			</MediaNav>
			{!mediaItems ? (
				<ModernLoading text="Загрузка картинок..." />
			) : mediaItems?.items?.length > 0 ? (
				<>
					<MediaText>ПОПУЛЯРНОЕ</MediaText>
					<MediaGrid>
						{mediaItems?.items?.map(item => (
							<MediaItem src={item.url} />
						))}
					</MediaGrid>
				</>
			) : (
				<EmptyText>картинок нет</EmptyText>
			)}
		</MediaContainer>
	)
}

const MediaContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
	margin-top: 10px;
  left: 0;
  max-width: 400px;
	width: 100%;
  background-color: #1c2438e6;
  border-radius: 24px;
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 32px;
`;
const MediaNav = styled.div`
  display: flex; 
	gap: 32px;
`;
const NavText = styled.p`
  display: flex;
	align-items: center;
  gap: 16px;
  color: ${({ $active }) => $active ? '#D6DCEC' : '#6A7080'};
  padding-bottom: 24px;
  border-bottom: 2px solid ${({ $active }) => $active ? '#336CFF' : 'transparent'};
  font-weight: 700;
  font-size: 24px;
  padding-right: 32px;
  cursor: pointer;
`
const MediaText = styled.p`
	text-transform: uppercase;
	margin-top: 32px;
	color: #6A7080;
	font-size: 12px;
	font-weight: 700;
`;
const MediaGrid = styled.div`
  margin-top: 24px;
  display: grid;
  gap: 8px;
	grid-template-columns: repeat(auto-fit, minmax(106px, 1fr));
	overflow-y: auto;
	height: 330px;
	scrollbar-width: none;
`;
const MediaItem = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
	object-fit: cover;
`;
const EmptyText = styled.p`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
  font-size: 16px;
  font-weight: 600;
  color: #6A7080;
  margin-top: 32px;
`;

export default MediaPopup