import styled from "styled-components";
import { useState } from "react";

const Checkbox = ({ color, children }) => {
    const [checked, setChecked] = useState(false);

    return (
        <CheckboxContainer>
            <HiddenCheckbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />
            <StyledCheckbox $color={color} checked={checked} />
            {children}
        </CheckboxContainer>
    );
};


const CheckboxContainer = styled.label`
    display: flex;
    gap: 24px;
    position: relative;
    cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
    display: none;
`;

const StyledCheckbox = styled.div`
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    border: 2px solid #6A7080;
    border-radius: 8px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:after {
        content: "";
        width: 16px;
        height: 16px;
        background: ${({ $color }) => $color || "#336CFF"};
        border-radius: 50%;
        display: ${(props) => (props.checked ? "block" : "none")};
    }
`;

export default Checkbox;
