import styled from "styled-components";
import AccountIcon from "@/icons/AccountIcon";

const AvaPlug = ({width, height}) => {
  return (
    <Plug $width={width} $height={height}>
        <AccountIcon color="#fff"/>
    </Plug>
  )
}

const Plug = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({$width}) => $width};
  height: ${({$height}) => $height};
  border-radius: 12px;
  background-color: #2B89ED;
`;

export default AvaPlug
