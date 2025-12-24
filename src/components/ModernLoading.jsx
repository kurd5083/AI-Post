import styled, { keyframes } from "styled-components";

const ModernLoading = ({text}) => (
  <LoadingSpinner>
    <SpinnerRing />
    <LoadingText>{text}</LoadingText>
  </LoadingSpinner>
);

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;
const LoadingSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  min-height: 300px;
  width: 100%;
`;
const SpinnerRing = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(108, 99, 255, 0.1);
  border-top: 4px solid #6C63FF;
  border-radius: 50%;
  animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    border: 3px solid transparent;
    border-top: 3px solid #FF6584;
    border-radius: 50%;
    top: 8px;
    left: 8px;
    animation: ${spin} 0.8s linear infinite reverse;
  }
`;
const LoadingText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #6A7080;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export default ModernLoading