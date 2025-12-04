import styled from "styled-components";

export const BtnSave = styled.button`
  padding: 21px 32px;
  border-radius: 12px;
  color: ${({ $color }) => $color || "#336CFF"};
  background-color: ${({ $bg }) => $bg || "#1B243E"};
  font-weight: 700;
  font-size: 14px;
  margin-top: ${({ $margin }) => $margin || "30"}px;
  width: fit-content;
`
export default BtnSave
