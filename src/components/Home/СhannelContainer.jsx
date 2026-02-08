import styled from 'styled-components';

const СhannelContainer = ({ children }) => {

  return (
    <TableContainer >
      <TableWrapper >
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
`;
const TableWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-height: 400px; 
  overflow-y: auto;
  scrollbar-width: none;
  padding-bottom: 20px;
`;

export default СhannelContainer