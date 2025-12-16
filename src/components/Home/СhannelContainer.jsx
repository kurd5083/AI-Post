import styled from 'styled-components';
import useFadeOnScroll from "@/lib/useFadeOnScroll";

const СhannelContainer = ({ children }) => {
  const { fadeVisible, ref } = useFadeOnScroll(20);

  return (
    <TableContainer $fadeVisible={fadeVisible}>
      <TableWrapper ref={ref}>
        {children}
      </TableWrapper>
    </TableContainer>
  )
}
const TableContainer = styled.div`
  position: relative;
  margin-top: 20px;
  padding: 0 32px;

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
    opacity: ${({$fadeVisible}) => $fadeVisible ? 1 : 0};
    pointer-events: none;

    @media(max-width: 1400px) {
      display: none;
    }
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  max-height: calc(100dvh - 600px); 
  min-height: 400px;
  overflow-y: auto;
  scrollbar-width: none;
  padding-bottom: 20px;
`;

export default СhannelContainer