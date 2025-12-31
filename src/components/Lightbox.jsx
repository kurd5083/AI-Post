import { useState } from "react";
import styled from "styled-components";
import { useLightboxStore } from "@/store/lightboxStore";

const Lightbox = () => {
    const { images, initialIndex, closeLightbox } = useLightboxStore();
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    console.log(images, initialIndex)
    
    // if (!images.length) return null;

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images?.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images?.length - 1 ? 0 : prev + 1));
    };

    return (
        <Overlay onClick={()=> closeLightbox()}>
            <Content onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={()=> closeLightbox()}>&times;</CloseButton>
                <NavButton left onClick={handlePrev}>&lt;</NavButton>
                <Image src={images?.[currentIndex]} alt={`img-${currentIndex}`} />
                <NavButton onClick={handleNext}>&gt;</NavButton>
            </Content>
        </Overlay>
    );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Content = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 12px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -20px;
  right: -20px;
  font-size: 32px;
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ left }) => (left ? "left: -50px;" : "right: -50px;")}
  transform: translateY(-50%);
  font-size: 48px;
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
`;

export default Lightbox;