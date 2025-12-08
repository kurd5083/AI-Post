import styled from "styled-components";

export const BtnBase = styled.button`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: ${({ $padding }) => $padding ? $padding : '21px 32px'} ;
  border-radius: 12px;
  color: ${({ $color }) => $color || "#336CFF"};
  background-color: ${({ $bg }) => $bg || "#1B243E"};
  font-weight: 700;
  font-size: 14px;
  margin-top: ${({ $margin }) => $margin ? $margin : "0"}px;
  width: fit-content;
  border: ${({ $border }) => $border ? '2px solid #333E59' : 'none'} 
`
export default BtnBase
