import styled from "styled-components";
import AccountIcon from "@/icons/AccountIcon";

const AvaPlug = () => {
  return (
    <Plug>
        <AccountIcon color="#fff"/>
    </Plug>
  )
}

const Plug = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: #2B89ED;
`;

export default AvaPlug
