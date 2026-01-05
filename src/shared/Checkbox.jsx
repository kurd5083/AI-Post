import styled from "styled-components";

const Checkbox = ({ checked, onChange, color, children, width, height, }) => {
  return (
    <CheckboxContainer onClick={() => onChange()}>
      <HiddenCheckbox type="checkbox" checked={checked} readOnly />
      <StyledCheckbox $color={color} checked={checked} $width={width} $height={height}/>
      {children}
    </CheckboxContainer>
  );
};

const CheckboxContainer = styled.div`
  display: flex;
  gap: 24px;
  position: relative;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  display: none;
  pointer-events: none;
`;

const StyledCheckbox = styled.div`
  box-sizing: border-box;
  width: ${({ $width }) => $width || "40px"};
  height: ${({ $height }) => $height || "40px"};
  flex-shrink: 0;
  border: 2px solid #6A7080;
  border-radius: 8px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    content: "";
    width: ${({ $width }) => $width ? "8px" : "16px"};
    height: ${({ $height }) => $height ? "8px" : "16px"};
    background: ${({ $color }) => $color || "#336CFF"};
    border-radius: 50%;
    display: ${(props) => (props.checked ? "block" : "none")};
  }
`;

export default Checkbox;
