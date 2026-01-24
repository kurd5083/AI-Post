import { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const months = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];
const yTicks = [100, 80, 40, 20, 10, 0];
const points = [10, 20, 35, 50, 45, 60, 70, 65, 80, 90, 85, 100];
const Chart = ({ data }) => {
  const containerRef = useRef();
  const [hoverData, setHoverData] = useState({ index: null, x: 0, y: 0, value: 0 });
  const [containerWidth, setContainerWidth] = useState(300);
  const maxY = Math.max(...points, 100);
  const formatY = (val) => {
    const scaled = Math.round((val / maxY) * 100);
    return `${scaled}k`;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      let width = containerRef.current.offsetWidth;
      width -= window.innerWidth < 1600 ? 32 * 2 : 52 * 2;
      setContainerWidth(width);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const makeSmoothBezierPath = (values, height) => {
    if (!values?.length) return "";
    const width = containerWidth;
    const step = width / (values.length - 1);
    const pts = values.map((v, i) => [i * step, height - (v / 100) * height]);
    if (pts.length < 2) return "";

    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      const cp1x = x0 + (x1 - x0) / 2;
      const cp1y = y0;
      const cp2x = x0 + (x1 - x0) / 2;
      const cp2y = y1;
      d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${x1},${y1}`;
    }
    return d;
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current || points.length === 0) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const step = containerWidth / (points.length - 1);
    const index = Math.round(x / step);
    const clampedIndex = Math.max(0, Math.min(points.length - 1, index));

    const height = 300;
    const y = height - (points[clampedIndex] / 100) * height;

    setHoverData({
      index: clampedIndex,
      x: clampedIndex * step,
      y,
      value: points[clampedIndex],
    });
  };

  const handleMouseLeave = () => setHoverData({ index: null, x: 0, y: 0, value: 0 });
  const getTooltipY = (y) => {
    const topPadding = 18;
    const bottomPadding = 18;
    const height = 300;
    if (y < topPadding) return y + 20;
    if (y > height - bottomPadding) return y - 20;
    return y - 10;
  };

  return (
    <StatsChartContainer ref={containerRef}>
      <StatsYAxis>
        {["100.0k", "80.0k", "40.0k", "20.0k", "10.0k", "0"].map((val, i) => <span key={i}>{val}</span>)}
      </StatsYAxis>

      <StatsChart
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <StatsChartLine>
          <svg viewBox={`0 0 ${containerWidth} 300`} preserveAspectRatio="none">
            <defs>
              <linearGradient id="fadeStroke" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#94b2ffc3" />
                <stop offset="50%" stopColor="#336dffd8" />
                <stop offset="100%" stopColor="#336dffac" />
              </linearGradient>
            </defs>
            {yTicks.map((val, i) => {
    const y = 300 - (val / 100) * 300;

    return (
      <line
        key={i}
        x1={0}
        x2={containerWidth}
        y1={y}
        y2={y}
        stroke="#2A3145"
        strokeDasharray="4 4"
      />
    );
  })}

            <path
              d={makeSmoothBezierPath(points, 300)}
              stroke="url(#fadeStroke)"
              strokeWidth="3"
              fill="none"
            />

            {hoverData.index !== null && (
              <g>
                <circle
                  cx={hoverData.x}
                  cy={hoverData.y}
                  r="6"
                  fill="#336CFF"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                />
                <text
                  x={hoverData.x}
                  y={getTooltipY(hoverData.y)}
                  textAnchor="middle"
                  fontWeight={600}
                  fontSize="14"
                  fill="#FFF"
                >
                  {formatY(hoverData.value)}
                </text>
                <line
                  x1={hoverData.x}
                  y1={hoverData.y}
                  x2={hoverData.x}
                  y2={185}
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  strokeDasharray="4 2"
                />
              </g>
            )}
          </svg>
        </StatsChartLine>

        <StatsChartGradient>
          <svg viewBox={`0 0 ${containerWidth} 300`} preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradientFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#193169" />
                <stop offset="100%" stopColor="#13192ac7" />
              </linearGradient>
            </defs>
            <path
              d={`${makeSmoothBezierPath(points, 300)} L${containerWidth},280 L0,280 Z`}
              fill="url(#gradientFill)"
            />
          </svg>
        </StatsChartGradient>
      </StatsChart>

      <StatsData>
        {months.map((month, i) => (
          <span key={i} style={{ left: `${(i / (months.length - 1)) * 100}%` }}>
            {month}
          </span>
        ))}
      </StatsData>
    </StatsChartContainer>
  );
};

const StatsChartContainer = styled.div`
  display: grid;
  align-items: end;
  justify-items: start;
  grid-template-columns: 50px 1fr;
  grid-template-rows: 300px 50px;
  padding: 0 56px;

  @media(max-width: 1600px) { padding: 0 32px; }
  @media(max-width: 768px) { padding: 0 24px; }
`;
const StatsYAxis = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  grid-column: 1;
  grid-row: 1;
  span {
    font-size: 10px;
    font-weight: 600;
    color: #6A7080;
  }
`;
const StatsChart = styled.div`
  grid-column: 2;
  grid-row: 1;
  width: 100%;
  height: 300px;
  position: relative;
`;
const StatsChartLine = styled.div`
  margin-right: -15px;
  path {
    filter: drop-shadow(0 0 6px #336dffae);
  }
`;
const StatsChartGradient = styled.div`
  margin-right: -15px;
  margin-top: -280px;
`;
const StatsData = styled.div`
  text-transform: uppercase;
  box-sizing: border-box;
  grid-column: 2;
  grid-row: 2;
  display: flex;
  justify-content: space-between;
  color: #6A7080;
  font-size: 10px;
  font-weight: 600;
  position: relative;
  width: 100%;
`;

export default Chart;
