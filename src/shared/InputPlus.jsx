import styled from "styled-components";
import plus_crimson from "@/assets/popup/plus-crimson.svg";
import plus_blue from "@/assets/popup/plus-blue.svg";

const InputPlus = ({title, placeholder, img}) => {
    return (
        <>
            <InputPlusTitle>{title}</InputPlusTitle>
            <InputPlusContainer>
                <InputPlusInput type="text" placeholder={placeholder} />
                <InputPlusImg $color={img} src={img == 'crimson' ? plus_crimson : plus_blue} alt="plus icon" width={16} height={16} />
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
    gap: 24px;
`
const InputPlusInput = styled.input`
    background-color: transparent;
    max-width: 340px;
    width: 100%;
    color: #D6DCEC;
    font-size: 24px;
    font-weight: 700;
    padding-bottom: 24px;
    border: none;
    border-bottom: 2px solid #2E3954;

    &::placeholder {
        color: #D6DCEC;
    }
    @media(max-width: 480px) {
        font-size: 16px;
    }
`
const InputPlusImg = styled.img`
    padding: 12px;
    background-color: ${({$color}) => $color == 'crimson' ? '#2D2740' : '#142136'} ;
    border-radius: 50%;
    cursor: pointer;

`
export default InputPlus
