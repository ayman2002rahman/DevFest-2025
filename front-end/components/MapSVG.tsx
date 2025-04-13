import React from 'react';
import Svg, { Path, Line } from 'react-native-svg';

type PathProps = {
  currentIndex: number;
};

export default function MapSVG({ currentIndex }: PathProps) {
  return (
    <Svg
      width="376"
      height="731"
      viewBox="0 0 376 731"
      fill="none"
    >
      {/* EXAMPLE OVAL */}
      <Path
        d="M117.817 174.814C129.04 205.627 94.4641 212.048 71.7088 216.016C48.0897 220.135 14.4007 211.28 15.0081 190.177C15.6022 169.539 36.4662 166.192 54.2624 160.847C78.6926 153.509 108.258 148.569 117.817 174.814Z"
        fill={currentIndex === 0 ? "#FFD700" : "#4E2D6D"} // Yellow if active
      />
      <Path
        d="M369.817 337.814C381.04 368.627 346.464 375.048 323.709 379.016C300.09 383.135 266.401 374.28 267.008 353.177C267.602 332.539 288.466 329.192 306.262 323.847C330.693 316.509 360.258 311.569 369.817 337.814Z"
        fill={currentIndex === 1 ? "#FFD700" : "#4E2D6D"}
      />
      <Path
        d="M102.817 478.814C114.04 509.627 79.4641 516.048 56.7088 520.016C33.0897 524.135 -0.599337 515.28 0.00809998 494.177C0.602163 473.539 21.4662 470.192 39.2624 464.847C63.6926 457.509 93.2582 452.569 102.817 478.814Z"
        fill={currentIndex === 2 ? "#FFD700" : "#4E2D6D"}
      />

      {/* ...copy the rest of your <Path>, <Line>, etc. from the SVG here... */}
    </Svg>
  );
}
