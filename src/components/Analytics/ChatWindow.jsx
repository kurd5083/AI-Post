import styled from "styled-components";

const ChatWindow = ({ hoverData, height, width = 400 }) => {
  if (!hoverData) return null;

  let tooltipOffsetX = -120; 
  if (hoverData.x < 120) tooltipOffsetX = 10;
  else if (hoverData.x > width - 120) tooltipOffsetX = -140;
        console.log(hoverData)

  return (
    <>
      <HoverLine
        style={{
          left: hoverData.x,
          top: hoverData.y,
          height: height - hoverData.y,
        }}
      />
      <HoverDot
        style={{
          left: hoverData.x,
          top: hoverData.y,
        }}
      />
      <ChartTooltip
        style={{
          left: hoverData.x + tooltipOffsetX,
          top: hoverData.y - 70,
        }}
      >
        <ChartDate>{hoverData.date}</ChartDate>
        <ChartNumber>
          {hoverData.value}
          {hoverData.small != null && (
          <>
            <span> / </span>
            <small>{`${hoverData.small} %`}</small>
          </>
        )}</ChartNumber>
        <span>{hoverData.label}</span>
      </ChartTooltip>
    </>
  );
};

const HoverDot = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  background: #336CFF;
  border: 3px solid #fff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 4;
`;

const HoverLine = styled.div`
  position: absolute;
  width: 0;
  border-left: 1px dashed #fff;
  opacity: 0.6;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 3;
`;

const ChartTooltip = styled.div`
  box-sizing: border-box;
  position: absolute;
  background: #6A708029;
  backdrop-filter: blur(64px);
  border-radius: 12px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.562);
  white-space: nowrap;
  z-index: 25;
  min-width: 120px;

  span {
    color: #6A7080;
    font-size: 11px;
    font-weight: 700;
  }
`;
const ChartDate = styled.p`
  color: #D6DCEC;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 8px;
`;
const ChartNumber = styled.p`
  color: #D6DCEC;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 4px;
  span {
    font-size: 12px;
    color: #6A7080;
  }
  small {
    font-size: 12px;
    color: #B5EC5B;
  }
`;

export default ChatWindow;
