import { GameContext } from '@/contexts/gameContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dot } from './components';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from '@/components/ui';

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
      const x =
        ((e.clientX - rect.left - dotSize / 2) /
          (imageRef.current?.width || 0)) *
        100;
      const y =
        ((e.clientY - rect.top - dotSize / 2) /
          (imageRef.current?.height || 0)) *
        100;
      setClickCoordinates({ x, y });
    }
  };

  if (isClicked) console.log(clickCoordinates.x, clickCoordinates.y);

  console.log(dotSize);

  return (
    <div className={`w-fit mx-auto cursor-pointer relative`}>
      <img
        ref={imageRef}
        src={game?.imageSrc}
        alt={game?.name}
        onClick={handleClick}
        className='w-full'
      />
      {isClicked && (
        <>
          <Dot clickCoordinates={clickCoordinates} dotSize={dotSize} />
          <Card
            style={{
              top: `calc(${clickCoordinates.y}% + ${dotSize}px)`,
              left: `${clickCoordinates.x}%`,
            }}
            className='absolute cursor-default'
          >
            <CardHeader className='px-3 py-2'>
              <CardTitle className='text-nowrap text-base'>
                Choose a target!
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className='pl-3 pr-4 py-3'>
              <ul className='flex flex-col'>
                {game?.targets.map((target) => (
                  <li
                    key={target.name}
                    onClick={() => {
                      console.log(target);
                      setIsClicked(!isClicked);
                    }}
                    className='flex cursor-pointer items-center gap-2 rounded-sm hover:bg-neutral-800 p-1 text-sm'
                  >
                    {
                      <img
                        src={target.src}
                        width={30}
                        className='max-h-[30px] object-cover rounded-sm'
                      />
                    }
                    <p>{target.name}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Game;
