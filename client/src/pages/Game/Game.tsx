import { GameContext } from '@/contexts/gameContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type Target = {
  name: string;
  src: string;
};

export type Game = {
  id: number;
  name: string;
  imageSrc: string;
  targets: Target[];
};

const Game = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [dotSize, setDotSize] = useState(0);
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });

  const { game } = useContext(GameContext);
  const navigate = useNavigate();
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!game) {
      navigate('/');
    }
  }, [game, navigate]);

  const handleClick = (e: React.MouseEvent) => {
    setIsClicked(!isClicked);

    const rect = imageRef.current?.getBoundingClientRect();

    const image = imageRef.current;
    const imageWidth = image?.width || 0;
    const imageHeight = image?.height || 0;

    const dotSize = Math.min(imageWidth, imageHeight) * 0.065;
    setDotSize(dotSize);

    if (rect) {
      const x = e.clientX - rect.left - dotSize / 2;
      const y = e.clientY - rect.top - dotSize / 2;
      console.log(imageWidth, imageHeight);
      setClickCoordinates({ x, y });
    }
  };

  if (isClicked)
    console.log(
      (clickCoordinates.x / (imageRef.current?.width || 0)) * 100,
      (clickCoordinates.y / (imageRef.current?.height || 0)) * 100
    );

  return (
    <div className={`relative w-fit mx-auto cursor-pointer`}>
      <img
        ref={imageRef}
        src={game?.imageSrc}
        alt={game?.name}
        onClick={handleClick}
        style={{ maxWidth: '100%' }}
      />
      {isClicked && (
        <svg
          style={{
            position: 'absolute',
            top: `${clickCoordinates.y}px`,
            left: `${clickCoordinates.x}px`,
            width: dotSize + 'px',
            height: dotSize + 'px',
          }}
          xmlns='http://www.w3.org/2000/svg'
          viewBox={`-1 -1 ${dotSize + 3} ${dotSize + 3}`}
          className={`z-50 animate-spin spin hover:cursor-default`}
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
      )}
    </div>
  );
};

export default Game;
