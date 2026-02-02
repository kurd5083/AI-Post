import { useRef, useState } from "react";
import styled from "styled-components";
import ChatWindow from "@/components/Analytics/ChatWindow";

const LineChart = ({ points = [], labels, tooltipLabels, width = 400, height = 150, type, filter }) => {
  const buildYAxis = (values = [], steps = 5) => {
    const max = Math.max(...values, 0);

    if (max === 0) return [0];

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
    for (let v = top; v >= 0; v -= step) {
      ticks.push(v);
    }

    return ticks;
  };

  const [hoverData, setHoverData] = useState(null);
  const svgRef = useRef(null);

  const makeSmoothBezierPath = (values, height, actualWidth) => {
    if (!values.length) return "";
    const step = actualWidth / (values.length - 1);
    const max = Math.max(...values, 1);

    const pts = values.map((v, i) => [
      i * step,
      height - (v / max) * height
    ]);
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
    if (!svgRef.current || !points.length) return;

    const rect = svgRef.current.getBoundingClientRect();
    const actualWidth = rect.width;
    const x = e.clientX - rect.left;
    const step = actualWidth / (points.length - 1);
    const index = Math.round(x / step);
    const clampedIndex = Math.max(0, Math.min(points.length - 1, index));
    const max = Math.max(...points, 1);
    const y = height - (points[clampedIndex] / max) * height;
    let labelText = "";
    switch (type) {
      case "subscribers":
        labelText = "Подписались";
        break;
      case "adReach":
        labelText = "Рекл. охват";
        break;
      case "posts":
        labelText = "Публикации";
        break;
      default:
        labelText = "";
    }

    setHoverData({
      index: clampedIndex,
      x: clampedIndex * step,
      y,
      value: points[clampedIndex],
      label: labelText,
      date: tooltipLabels?.[clampedIndex] || null,

    });
  };

  const handleMouseLeave = () => setHoverData(null);

  return (
    <>
      <StatsYAxis>
        {buildYAxis(points).map((val, i) => (
          <span key={i}>{val.toLocaleString()}</span>
        ))}
      </StatsYAxis>
      <StatsChart onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} $height={height}>
        <StatsChartLine>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            width="100%"
            height={height}
          >
            <defs>
              <linearGradient id="fadeStroke" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#94b2ffc3" />
                <stop offset="50%" stopColor="#336dffd8" />
                <stop offset="100%" stopColor="#336dffac" />
              </linearGradient>
            </defs>
            <path
              d={makeSmoothBezierPath(points, height, width)}
              stroke="url(#fadeStroke)"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </StatsChartLine>

        {hoverData && <ChatWindow hoverData={hoverData} height={height} points={points} type={type} />}

        <StatsChartGradient $height={height}>
          <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" width="100%" height={height}>
            <defs>
              <linearGradient id="gradientFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#193169" />
                <stop offset="100%" stopColor="#13192ac7" />
              </linearGradient>
            </defs>
            <path
              d={`${makeSmoothBezierPath(points, height, width)} L${width},${height} L0,${height} Z`}
              fill="url(#gradientFill)"
            />
          </svg>
        </StatsChartGradient>
      </StatsChart>
      <StatsData>
        {(filter === "year"
          ? ["янв.", "фев.", "мар.", "апр.", "май", "июн.", "июл.", "авг.", "сен.", "окт.", "ноя.", "дек."]
          : labels
        ).map((label, i, arr) => {
          const step = Math.ceil(arr.length / 12);
          if (i % step !== 0) return null;

          return (
            <span key={i} style={{ left: `${(i / (arr.length - 1)) * 100}%` }}>
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
  grid-column: 2;
  grid-row: 1;
  width: 100%;
  min-width: 200px;
  height: ${({$height}) => `${$height}px`};
`;
const StatsChartLine = styled.div`
  path {
    filter: drop-shadow(0 0 6px #336dffae);
  }
`;
const StatsChartGradient = styled.div`
  margin-top: ${({$height}) => `-${$height}px`};
`;
const StatsData = styled.div`
  text-transform: uppercase;
  box-sizing: border-box;
  grid-column: 2;
  grid-row: 2;
  display: flex;
  gap: 2px;
  justify-content: space-between;
  width: 100%;
  min-width: 200px;
  color: #6A7080;
  font-size: 10px;
  font-weight: 600;
`;

export default LineChart;