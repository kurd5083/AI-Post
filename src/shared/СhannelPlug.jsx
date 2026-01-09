import styled from "styled-components";

const СhannelPlug = ({width, height, text}) => {
  return (
    <Plug $width={width} $height={height}>
      {text?.split(" ").map(word => word[0]).join("").toUpperCase()}
    </Plug>
  )
}

const Plug = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({$width}) => $width};
  height: ${({$height}) => $height};
  border-radius: 12px;
  background-color: #2B89ED;
  font-size: 20px;
  font-weight: 700;
`;

export default СhannelPlug
