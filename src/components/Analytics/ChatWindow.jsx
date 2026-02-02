import styled from "styled-components";

const ChatWindow = ({ hoverData, height }) => {
	if (!hoverData) return null;

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
					left: hoverData.x + 10,
					top: hoverData.y - 30,
				}}
			>
				<ChartDate>{hoverData.date}</ChartDate>
				<ChartNumber>{hoverData.value}</ChartNumber>
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
  position: absolute;
  transform: translate(-130%, 10%);
  background: #6A708029;
  backdrop-filter: blur(24px);
  border-radius: 12px;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  pointer-events: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  white-space: nowrap;
  z-index: 5;

  span {
    color: #6A7080;
    font-size: 10px;
  }
`;
const ChartDate = styled.p`
   	color: #D6DCEC;
	font-size: 12px;
	font-weight: 600;
`;
const ChartNumber = styled.p`
   	color: #336CFF;
    font-weight: 700;
    font-size: 14px;
`;

export default ChatWindow;