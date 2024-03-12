interface DotProps {
  clickCoordinates: {
    x: number;
    y: number;
  };
  dotSize: number;
}

const Dot = ({ clickCoordinates, dotSize }: DotProps) => {
  return (
    <svg
      style={{
        position: 'absolute',
        top: `${clickCoordinates.y}%`,
        left: `${clickCoordinates.x}%`,
        width: dotSize + 'px',
        height: dotSize + 'px',
      }}
      xmlns='http://www.w3.org/2000/svg'
      viewBox={`-1 -1 ${dotSize + 3} ${dotSize + 3}`}
      className={`animate-spin spin hover:cursor-default`}
    >
      <circle
        cx={dotSize / 2}
        cy={dotSize / 2}
        r={dotSize / 2}
        stroke='red'
        strokeWidth='2'
        fill='none'
        strokeDasharray='10'
      />
    </svg>
  );
};

export default Dot;
