import { useState } from "react";
import styled from "styled-components";

import ImageIcon from "@/icons/ImageIcon";
import VideoIcon from "@/icons/VideoIcon"; 

import Empty from "@/shared/Empty";
import ModernLoading from "@/components/ModernLoading";

import { useGetMediaLibrary } from "@/lib/mediaLibrary/useGetMediaLibrary";

import { usePostsStore } from "@/store/postsStore";

const MediaPopup = ({postId}) => {
	const [activeTab, setActiveTab] = useState("photo");

	const { mediaItems } = useGetMediaLibrary();
	const { addImages } = usePostsStore();
	
	const handleAddImage = (url) => {
		if (!postId) return;
		addImages(postId, [url]);
	};

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
							<MediaItem
								key={item.url}
								src={item.url}
								onClick={() => handleAddImage(item.url)}
								/>
						))}
					</MediaGrid>
				</>
			) : (
				<EmptyContainer>
					<Empty icon="🖼️">картинок нет</Empty>
				</EmptyContainer>
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
`;
const MediaNav = styled.div`
  display: flex; 
	gap: 32px;
  padding: 32px;

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
	color: #6A7080;
	font-size: 12px;
	font-weight: 700;
	padding: 0 32px;
`;
const MediaGrid = styled.div`
	padding: 24px 32px 32px;
	display: grid;
	gap: 8px;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
	overflow-y: auto;
	height: 330px;
	scrollbar-width: none;

	@media(max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
  }
`;
const MediaItem = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  transition: transform .12s ease;

  &:hover {
    transform: scale(1.05);
  }
`;
const EmptyContainer = styled.p`
  margin-top: 32px;
`;

export default MediaPopup