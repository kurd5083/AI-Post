import styled from "styled-components";
const icons = ["🐻", "🐟", "🐱", "🦄", "🐶", "🐸", "🍀", "🎵", "🌳"];

const СhannelPlug = ({width, height, text, radius, fs}) => {
  const hash = Array.from(text).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue1 = hash % 360;
  const hue2 = (hash + 60) % 360;
  const bgGradient = `linear-gradient(135deg, hsl(${hue1}, 70%, 50%), hsl(${hue2}, 70%, 50%))`;
  const icon = icons[hash % icons.length];
  
  return (
    <Plug $width={width} $height={height} $radius={radius} $fs={fs}  $bgGradient={bgGradient}>
       <SVGWrapper viewBox="0 0 100 100">
        <defs>
          <linearGradient id={`grad-${hash}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={`hsl(${hue1}, 70%, 50%)`} />
            <stop offset="100%" stopColor={`hsl(${hue2}, 70%, 50%)`} />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="50" fill={`url(#grad-${hash})`} />
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff"
          fontSize={fs || "40"}
        >
          {icon}
        </text>
      </SVGWrapper>
    </Plug>
  )
}

const Plug = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${({$width}) => $width};
  height: ${({$height}) => $height};
  border-radius: ${({$radius}) => $radius ? $radius : "12px"};
  background: ${({ $bgGradient }) => $bgGradient || "#2B89ED"};
  font-size: ${({$fs}) => $fs ? $fs : "20px"};
  font-weight: 700;
`;
const SVGWrapper = styled.svg`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
export default СhannelPlug
