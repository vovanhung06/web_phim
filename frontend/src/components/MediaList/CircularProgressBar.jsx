import React from "react";

const CircularProgressBar = ({ score = 10 }) => {
  const percent = Math.round(score*10)
  const size = 4;
  const strokeWidth = 0.25;
  const radius = size / 2 - strokeWidth;
    return (
    <div className="relative -top-[2vw]">
      <svg width={`${size}vw`} height={`${size}vw`}>
        <circle
          cx={`${size / 2}vw`}
          cy={`${size / 2}vw`}
          r={`${radius}vw`}
          stroke="white"
          strokeWidth={`${strokeWidth}vw`}
        />
        <circle
          cx={`${size / 2}vw`}
          cy={`${size / 2}vw`}
          r={`${radius}vw`}
          stroke={`rgb(${255 - percent/100*255}, ${percent/100*255}, 0)`}
          strokeWidth={`${strokeWidth}vw`}
          strokeDasharray={`${2*Math.PI*radius}vw`}
          strokeDashoffset={`${2*Math.PI*radius - (percent / 100) * 2*Math.PI*radius}vw`}
          transform="rotate(-90)"
          style={{ transformOrigin: "center" }}
          strokeLinecap="round"
        />
        <text
          x={`${size / 2}vw`}
          y={`${size / 2}vw`}
          fill="white"
          alignmentBaseline="middle"
          textAnchor="middle"
          fontSize={"1.2vw"}
        >
          {percent}
        </text>
      </svg>
    </div>
  );
};

export default CircularProgressBar;
