import styled from "styled-components";

const BtnBase = styled.button`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: ${({ $padding }) => $padding ? $padding : '21px 32px'};
  border-radius: ${({ $radius }) => $radius ? $radius : '12px'};
  color: ${({ $color }) => $color || "#336CFF"};
  background-color: ${({ $bg }) => $bg || "#1B243E"};
  font-weight: 700;
  font-size: 14px;
  margin-top: ${({ $margin }) => $margin ? $margin : "0"}px;
  width: ${({ $width }) => $width || "fit-content"};
  border: ${({ $border, $bg }) => $border ? '2px solid #333E59' : `2px solid ${$bg}`};
  
  /* ✨ Добавляем анимацию */
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $bg }) => $bg ? lighten(0.05, $bg) : "#242C52"};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
    opacity: 0.95;
  }
`;
export default BtnBase
