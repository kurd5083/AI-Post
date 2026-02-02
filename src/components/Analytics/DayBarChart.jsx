import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

const DayBarChart = ({ points = [], height = 150 }) => {
  const [hover, setHover] = useState(null);
  const [chartWidth, setChartWidth] = useState(400);
  const chartRef = useRef(null);

  const maxBarWidth = 8;
  const max = Math.max(...points, 1);
  const gap = 6;
  const hoursLabels = Array.from({ length: 24 }, (_, i) => `${i + 1}`);

  const buildYAxis = (values = [], steps = 5) => {
      const max = Math.max(...values, 0);
      if (!max) return [0];

      const raw = max / (steps - 1);
      const mag = 10 ** Math.floor(Math.log10(raw));
      const norm = raw / mag;

      let nice;
      if (norm <= 1) nice = 1;
      else if (norm <= 2) nice = 2;
      else if (norm <= 5) nice = 5;
      else nice = 10;

      const step = nice * mag;
      const top = Math.ceil(max / step) * step;

      const ticks = [];
      for (let v = top; v >= 0; v -= step) ticks.push(v);

      return ticks;
    };

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        setChartWidth(chartRef.current.clientWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const finalBarWidth = Math.min(chartWidth / points.length - gap, maxBarWidth);

  return (
    <>
      <StatsYAxis>
        {buildYAxis(points).map((val, i) => (
          <span key={i}>{val.toLocaleString()}</span>
        ))}
      </StatsYAxis>
      <StatsChart ref={chartRef}>
        <svg viewBox={`0 0 ${chartWidth} ${height}`} width="100%" preserveAspectRatio="none">
          {points.map((value, i) => {
            const h = (value / max) * height;
            const x = i * (finalBarWidth + gap);
            const y = height - h;
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width={finalBarWidth}
                height={h}
                rx={6}
                fill={hover === i ? "#336CFF" : "#2E3954"}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}
        </svg>

        {hover !== null && (
          <Tooltip style={{ left: `${hover * (finalBarWidth + gap) + finalBarWidth / 2}px` }}>
            {points[hover].toLocaleString()} просмотров
          </Tooltip>
        )}


      </StatsChart>
      <StatsData>
        {hoursLabels.map((l, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${i * (finalBarWidth + gap) + finalBarWidth / 2}px`,
              transform: "translateX(-50%)",
              bottom: 0,
            }}
          >
            {l}
          </span>
        ))}
      </StatsData>
    </>
  );
};
const StatsYAxis = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
	grid-column:  1;
  grid-row: 1;

  span {
    font-size: 10px;
    font-weight: 600;
    color: #6A7080;
  }
`;
const StatsChart = styled.div`
  position: relative;
  width: 100%;
  min-width: 330px;
  height: 150px;
`;

const Tooltip = styled.div`
  position: absolute;
  top: -50px;
  transform: translateX(-50%);
  background: #1b2236;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
`;

const StatsData = styled.div`
  position: relative;
  text-transform: uppercase;
  grid-column: 2;
  grid-row: 2;
  color: #6A7080;
  font-size: 9px;
  font-weight: 600;
  min-width: 320px;
`;

export default DayBarChart;
