import styled from "styled-components";
import PlusIcon from "@/icons/PlusIcon";

const InputPlus = ({title, placeholder, bg, color, fs, padding}) => {
    return (
        <>
            <InputPlusTitle>{title}</InputPlusTitle>
            <InputPlusContainer>
                <InputPlusInput type="text" placeholder={placeholder} $fs={fs} $padding={padding}/>
                <PlusBtn $bg={bg}>
                    <PlusIcon color={color}/>
                </PlusBtn>
            </InputPlusContainer>
        </>
    )
}
const InputPlusTitle = styled.h2`
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
    color: #6A7080;
    margin-bottom: 26px;
`
const InputPlusContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`
const InputPlusInput = styled.input`
    background-color: transparent;
    max-width: 340px;
    width: 100%;
    color: #D6DCEC;
    font-size: ${({$fs}) => $fs ? $fs : '24px'};
    font-weight: 700;
    padding-bottom: ${({$padding}) => $padding ? $padding : '24px'};
    border: none;
    border-bottom: 2px solid #2E3954;

    &::placeholder {
        color: #D6DCEC;
    }
    @media(max-width: 480px) {
        font-size: 16px;
    }
`
const PlusBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    background-color: ${({$bg}) => $bg} ;
    border-radius: 50%;
`
export default InputPlus
