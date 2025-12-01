import { useState } from 'react';
import styled from 'styled-components';

const CheckboxText = ({ options, bg }) => {
    const [selected, setSelected] = useState(null);

    return (
        <CheckboxContainer>
            {options.map(option => (
                <CheckboxOption
                    key={option.id}
                    $selected={selected === option.id}
                    $bg = {bg}
                    onClick={() => setSelected(option.id)}
                >
                    {option.label}
                </CheckboxOption>
            ))}
        </CheckboxContainer>
    );
};
const CheckboxContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const CheckboxOption = styled.button`
  padding: 16px 56px 16px 24px;
  border-radius: 12px;
  border: 2px solid #333E59;
  font-size: 14px;
  font-weight: 700;
  position: relative;
  transition: background-color 0.2s, color 0.2s;
  color: #D6DCEC;

  &:after {
    content: '';
    width: 12px;
    height: 12px;
    border: 2px solid ${({ $selected, $bg }) => $selected ? $bg : '#333E59'};
    background-color: ${({ $selected, $bg }) => $selected ? $bg : 'transparent'};
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 24px;
  }
`;

export default CheckboxText;
