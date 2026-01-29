import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useLightboxStore } from "@/store/lightboxStore";

const Lightbox = () => {
  const { images, initialIndex, closeLightbox } = useLightboxStore();

  const [index, setIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const startPos = useRef({ x: 0, y: 0 });

  if (!images?.length) return null;

  const prev = () => {
    resetTransform();
    setIndex(i => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    resetTransform();
    setIndex(i => (i === images.length - 1 ? 0 : i + 1));
  };

  const resetTransform = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const onWheel = (e) => {
    e.preventDefault();
    setScale(s => Math.min(Math.max(s - e.deltaY * 0.001, 1), 4));
  };

  const onMouseDown = (e) => {
    if (scale === 1) return;
    setDragging(true);
    startPos.current = {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    };
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    setOffset({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y,
    });
  };

  const onMouseUp = () => setDragging(false);

  const onDoubleClick = () => {
    scale === 1 ? setScale(2) : resetTransform();
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <Overlay onClick={closeLightbox}>
      <Close onClick={closeLightbox}>×</Close>

      {images.length > 1 && (
        <Nav left onClick={(e) => { e.stopPropagation(); prev(); }}>
          ‹
        </Nav>
      )}

      <ImageWrapper
        onClick={(e) => e.stopPropagation()}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onDoubleClick={onDoubleClick}
      >
        <Image
          src={images[index]}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            cursor: scale > 1 ? "grab" : "default",
          }}
        />
      </ImageWrapper>

      {images.length > 1 && (
        <Nav onClick={(e) => { e.stopPropagation(); next(); }}>
          ›
        </Nav>
      )}
    </Overlay>
  );
};


const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ImageWrapper = styled.div`
  width: 90vw;
  height: 90vh;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;

  user-select: none;
  transition: transform 0.15s ease-out;
`;

const Nav = styled.button`
  position: absolute;
  top: 50%;
  ${({ left }) => (left ? "left: 32px;" : "right: 32px;")}
  transform: translateY(-50%);
  font-size: 64px;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

const Close = styled.button`
  position: absolute;
  top: 24px;
  right: 32px;
  font-size: 36px;
  background: none;
  color: #fff;
  border: none;
  cursor: pointer;
`;

export default Lightbox;
