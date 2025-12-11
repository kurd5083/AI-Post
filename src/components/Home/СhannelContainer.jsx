import { useRef, useState } from "react";
import styled from 'styled-components';

const СhannelContainer = ({children}) => {
    const wrapperRef = useRef(null);
    const [fadeVisible, setFadeVisible] = useState(true);
    const handleScroll = () => {
        const el = wrapperRef.current;
        if (!el) return;

        const isEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 50;
        setFadeVisible(!isEnd);
    };

    return (
        <TableContainer fadeVisible={fadeVisible}>
            <TableWrapper ref={wrapperRef} onScroll={handleScroll}>
                {children}
            </TableWrapper>
        </TableContainer>
    )
}
const TableContainer = styled.div`
  position: relative;
  margin-top: 20px;
  @media (max-width: 1600px) {
    padding: 0 32px;
  }
    @media (max-width: 768px) {
    padding: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 135px;
    width: 100%;
    background: linear-gradient(to top, #131826, transparent);
    backdrop-filter: blur(8px);
    mask-image: linear-gradient(to top, black 50%, transparent);
    transition: opacity 0.2s;
    opacity: ${props => props.fadeVisible ? 1 : 0};
    pointer-events: none;

    @media(max-width: 1400px) {
      display: none;
    }
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  max-height: calc(100svh - 600px); 
  min-height: 400px;
  overflow-y: auto;
  scrollbar-width: none;
`;

export default СhannelContainer