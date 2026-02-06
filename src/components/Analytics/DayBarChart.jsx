import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import ChatWindow from "@/components/Analytics/ChatWindow";

const DayBarChart = ({
  points = [],
  labels = [],
  hoverLabels,
  tooltipLabels,
  height = 150,
  type,
  showGrid = false,
  maxColumnWidth8 = false,
}) => {
  const chartRef = useRef(null);
  const svgRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(400);
  const [hoverData, setHoverData] = useState(null);

  useEffect(() => {
    const updateWidth = () => {
      if (chartRef.current) setChartWidth(chartRef.current.offsetWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

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

  let chartPoints = [...points];
  let chartLabels = [...labels];
  let chartHoverLabels = hoverLabels ? [...hoverLabels] : [];
  let chartTooltipLabels = tooltipLabels ? [...tooltipLabels] : [];

  if (type === "dynamicsPosts") {
    if (chartPoints.length < 24)
      chartPoints = [...chartPoints, ...Array(24 - chartPoints.length).fill(0)];
    else chartPoints = chartPoints.slice(0, 24);
    chartLabels = Array.from({ length: 24 }, (_, i) => i + 1);

    if (chartHoverLabels.length < 24)
      chartHoverLabels = [...chartHoverLabels, ...Array(24 - chartHoverLabels.length).fill(null)];
    else chartHoverLabels = chartHoverLabels.slice(0, 24);

    if (chartTooltipLabels.length < 24)
      chartTooltipLabels = [...chartTooltipLabels, ...Array(24 - chartTooltipLabels.length).fill("")];
    else chartTooltipLabels = chartTooltipLabels.slice(0, 24);
  }

  const yTicks = buildYAxis(chartPoints);
  const chartMax = yTicks[0] || 1;
  const MIN_BAR_WIDTH = 4;
  const MAX_BAR_WIDTH = 44;

  const step = chartWidth / chartPoints.length;

  let barWidth = step * 0.7;
  let gap = step * 0.3;

  barWidth = maxColumnWidth8
    ? barWidth
    : Math.max(MIN_BAR_WIDTH, Math.min(barWidth, MAX_BAR_WIDTH));

  const handleMouseMove = (e) => {
    if (!svgRef.current || !chartPoints.length) return;

    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const index = Math.floor(x / step);
    const clampedIndex = Math.max(0, Math.min(chartPoints.length - 1, index));

    setHoverData({
      index: clampedIndex,
      x: clampedIndex * step + barWidth / 2,
      value: chartPoints[clampedIndex],
      label: type === "dynamicsPosts" ? "Просмотров" : "Посты",
      tooltip: chartTooltipLabels?.[clampedIndex] || "",
      y: height - (chartPoints[clampedIndex] / chartMax) * height,
      date: chartHoverLabels?.[clampedIndex] || null,
    });
  };

  const handleMouseLeave = () => setHoverData(null);

  return (
    <>
      <StatsYAxis $chartWidth={chartWidth}>
        {yTicks.map((val, i) => (
          <span key={i}>{val.toLocaleString()}</span>
        ))}
      </StatsYAxis>

      <StatsChart
        ref={chartRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        $height={height}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${chartWidth} ${height}`}
          width="100%"
          height={height}
          preserveAspectRatio="none"
        >
          {showGrid &&
            yTicks.map((val, i) => {
              const y = height - (val / chartMax) * height;
              return (
                <line
                  key={i}
                  x1="0"
                  x2={chartWidth}
                  y1={y}
                  y2={y}
                  stroke="#2a3145"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                  opacity="0.6"
                />
              );
            })}

          {chartPoints.map((value, i) => {
            const h = (value / chartMax) * height;
            const x = i * step;
            const y = height - h;
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width={barWidth}
                height={h}
                rx={chartWidth < 800 ? 4 : 16}
                fill={hoverData?.index === i ? "#336CFF" : "#2E3954"}
              />
            );
          })}
        </svg>

        {hoverData && (
          <ChatWindow hoverData={hoverData} height={height} points={chartPoints} type={type} />
        )}
      </StatsChart>

      <StatsData $chartWidth={chartWidth} $maxColumnWidth8={maxColumnWidth8}>
        {chartLabels.length > 0 &&
          chartLabels.map((label, i) => {
            const x = i * step + barWidth / 2;
            return (
              <span
                key={i}
                style={{
                  left: `${x}px`,
                  transform: "translateX(-50%)",
                  width: `${barWidth}px`,
                  textAlign: "center",
                  display: "inline-block",
                }}
              >
                {label}
              </span>
            );
          })}
      </StatsData>
    </>
  );
};

const StatsYAxis = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  grid-column: 1;
  grid-row: 1;

  span {
    font-size: ${({ $chartWidth }) => $chartWidth > 700 ? '14px' : '12px'}; 
    font-weight: 600;
    color: #D6DCEC;
  }
`;

const StatsChart = styled.div`
  position: relative;
  grid-column: 2;
  grid-row: 1;
  width: 100%;
  height: ${({ $height }) => `${$height}px`};
`;

const StatsData = styled.div`
  position: relative;
  width: 100%;
  grid-column: 2;
  grid-row: 2;
  color: #d6dcec;
  font-size: ${({ $chartWidth, $maxColumnWidth8 }) => !$maxColumnWidth8 ? '8px' : $chartWidth > 700 ? '14px' : '12px'}; 
  font-weight: 600;

  span {
    position: absolute;
    white-space: nowrap;
    bottom: 0px;
  }
`;

export default DayBarChart;
