import styled from "styled-components";

const Empty = ({icon, children}) => {
  return (
    <EmptyMentions $icon={icon}>{children}</EmptyMentions>
  )
}

const EmptyMentions = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #D6DCEC;
  padding: 40px 20px;
  font-weight: 600;
  font-size: 16px;
  background: linear-gradient(135deg, #1C2438, #2A334E);
  border-radius: 24px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: "${props => props.$icon}";
    font-size: 48px;
    margin-bottom: 16px;
    animation: float 2s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @media (max-width: 1400px) {
    margin: 24px 32px 0;
  }
  @media (max-width: 768px) {
    margin: 24px 24px;
    font-size: 15px;
  }
  @media (max-width: 480px) {
    font-size: 13px;
    padding: 40px 16px;
    &::before {
      font-size: 36px;
      margin-bottom: 12px;
    }
  }
`;
export default Empty
