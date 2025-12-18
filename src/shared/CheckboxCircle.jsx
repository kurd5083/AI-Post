import styled from "styled-components";

const CheckboxCircle = ({ checked, onChange, color, children }) => {
  return (
    <CheckboxContainer onClick={onChange}>
      <HiddenCheckbox checked={checked} readOnly />
      <StyledCheckbox $color={color} $checked={checked} />
      {children}
    </CheckboxContainer>
  );
};

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const StyledCheckbox = styled.div`
  box-sizing: border-box;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border: 1px solid #6A7080;
  border-radius: 50%;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    content: "";
    width: 12px;
    height: 12px;
    background: ${({ $color }) => $color || "#336CFF"};
    border-radius: 50%;
    display: ${({ $checked }) => ($checked ? "block" : "none")};
  }
`;

export default CheckboxCircle;
