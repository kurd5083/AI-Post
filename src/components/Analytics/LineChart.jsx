import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import ChatWindow from "@/components/Analytics/ChatWindow";

const LineChart = ({ points = [], labels, hoverLabels, width = 400, height = 150, type, filter, showGrid = false }) => {
  const chartRef = useRef(null);
  const svgRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(width);
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

    const rawStep = max / (steps - 1);
    const magnitude = 10 ** Math.floor(Math.log10(rawStep));
    const norm = rawStep / magnitude;

    let nice;
    if (norm <= 1) nice = 1;
    else if (norm <= 2) nice = 2;
    else if (norm <= 5) nice = 5;
    else nice = 10;

    const step = nice * magnitude;
    const top = Math.ceil(max / step) * step;

    const ticks = [];
    for (let v = top; v >= 0; v -= step) ticks.push(v);
    return ticks;
  };

  let chartPoints = [...points];
  let chartLabels = labels ? [...labels] : [];
  let chartHoverLabels = hoverLabels ? [...hoverLabels] : [];

  if (type === "dynamicsPosts") {
    if (chartPoints.length < 24) chartPoints = [...chartPoints, ...Array(24 - chartPoints.length).fill(0)];
    else chartPoints = chartPoints.slice(0, 24);

    chartLabels = Array.from({ length: 24 }, (_, i) => i);

    if (chartHoverLabels.length < 24) chartHoverLabels = [
      ...chartHoverLabels,
      ...Array(24 - chartHoverLabels.length).fill(null)
    ];
    else chartHoverLabels = chartHoverLabels.slice(0, 24);
  }

  const yTicks = buildYAxis(chartPoints);
  const chartMax = yTicks[0] || 1;

  const makeSmoothBezierPath = (values, height, actualWidth, max) => {
    if (!values.length) return "";
    const step = actualWidth / (values.length - 1);
    const MIN_OFFSET = 3;

    const pts = values.map((v, i) => {
      const y = height - (v / max) * height;
      return [i * step, Math.min(height - MIN_OFFSET, y)];
    });
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
    if (!svgRef.current || !chartPoints.length) return;

    const rect = svgRef.current.getBoundingClientRect();
    const actualWidth = rect.width;
    const x = e.clientX - rect.left;
    const step = actualWidth / (chartPoints.length - 1);
    const index = Math.round(x / step);
    const clampedIndex = Math.max(0, Math.min(chartPoints.length - 1, index));

    let labelText = "";
    switch (type) {
      case "subscriber_growth": labelText = "Подписчики"; break;
      case "subscriptions_day": labelText = "Подписчики"; break;
      case "adReach": labelText = "Рекл. охват"; break;
      case "posts": labelText = "Публикации"; break;
      case "averageCoverage": labelText = "Ср. охват 1 публ."; break;
      case "dynamicsPosts": labelText = "Просмотов"; break;
      case "er": labelText = "Вовлеченность аудитории"; break;
      case "err": labelText = "Вовлеченность аудитории"; break;
      case "err24": labelText = "Рекламная вовлеченность"; break;
      default: labelText = "";
    }
    setHoverData({
      index: clampedIndex,
      x: clampedIndex * step,
      y: height - (chartPoints[clampedIndex] / chartMax) * height,
      value: chartPoints[clampedIndex],
      small: type === "dynamicsPosts" && `1`,
      label: labelText,
      date: chartHoverLabels?.[clampedIndex] || null,
    });
  };

  const handleMouseLeave = () => setHoverData(null);

  return (
    <>
      <StatsYAxis $chartWidth={chartWidth}>
        {yTicks.map((val, i) => <span key={i}>{val.toLocaleString()}</span>)}
      </StatsYAxis>

      <StatsChart ref={chartRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} $height={height}>
        <StatsChartLine>
          <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" width="100%" height={height}>
            <defs>
              <linearGradient id="fadeStroke" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#94b2ffc3" />
                <stop offset="50%" stopColor="#336dffd8" />
                <stop offset="100%" stopColor="#336dffac" />
              </linearGradient>
            </defs>

            {showGrid && yTicks.map((val, i) => {
              const y = height - (val / chartMax) * height;
              return <line key={i} x1="0" x2={width} y1={y} y2={y} stroke="#2a3145" strokeDasharray="4 4" strokeWidth="1" opacity="0.6" />;
            })}

            <path d={makeSmoothBezierPath(chartPoints, height, width, chartMax)} stroke="url(#fadeStroke)" strokeWidth="2" fill="none" />
          </svg>
        </StatsChartLine>

        {hoverData && <ChatWindow hoverData={hoverData} height={height} points={chartPoints} type={type} />}

        <StatsChartGradient $height={height}>
          <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" width="100%" height={height}>
            <defs>
              <linearGradient id="gradientFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#193169" />
                <stop offset="100%" stopColor="#13192ac7" />
              </linearGradient>
            </defs>
            <path d={`${makeSmoothBezierPath(chartPoints, height, width, chartMax)} L${width},${height} L0,${height} Z`} fill="url(#gradientFill)" />
          </svg>
        </StatsChartGradient>
      </StatsChart>
      <StatsData $chartWidth={chartWidth}>
        {chartLabels.length > 0 && chartLabels.map((_, i, arr) => {
          const isFirst = i === 0;
          const isLast = i === arr.length - 1;

          let showLabel = false;
          
          let labelText = chartLabels[i];
          
          if (type === "dynamicsPosts") {
            showLabel = true;
          } else {
            const minWidthPerTick = filter === "year" ? 100 : 70;
            const maxTicks = Math.min(11, Math.max(1, Math.floor(chartWidth / minWidthPerTick)));
            const step = Math.ceil(chartLabels.length / maxTicks);

            if (isFirst || isLast || i % step === 0) showLabel = true;
          }

          if (!showLabel) return null;

          const style = {
            left: `${(i / (arr.length - 1)) * 100}%`,
            transform: "translateX(-50%)",
          };
          return <span key={i} style={style}>
            {type === "posts" ? labelText.medium : type === "dynamicsPosts" ? labelText : (
              filter === "week" || filter === "month" || filter === "year" ?  labelText.medium : labelText.short
            )}
          </span>;
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
    font-size: ${({$chartWidth}) => $chartWidth > 600 ? '14px' : '12px'}; 
    font-weight: 600; 
    color: #D6DCEC; 
  }
`;
const StatsChart = styled.div`
  position: relative;
  grid-column: 2;
  grid-row: 1;
  width: 100%;
  min-width: 200px;
  height: ${({ $height }) => `${$height}px`};
`;
const StatsChartLine = styled.div` path { filter: drop-shadow(0 0 6px #336dffae); } `;
const StatsChartGradient = styled.div` margin-top: ${({ $height }) => `-${$height}px`}; `;
const StatsData = styled.div`
  position: relative;
  width: 100%;
  grid-column: 2;
  grid-row: 2;
  gap: 2px;
  min-width: 200px;
  color: #D6DCEC;
  font-size: ${({$chartWidth}) => $chartWidth > 600 ? '14px' : '10px'}; 
  font-weight: 600;
  span { 
    position: absolute; 
    transform: translateX(-50%); 
    white-space: nowrap; 
    bottom: 0px;
  }
`;

export default LineChart;
