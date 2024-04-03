import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dot, DropdownMenu, GameOverDialog, Stopwatch } from './components';
import axios from 'axios';
import { buttonVariants, useToast } from '@/components/ui';
import { GameContext, NavFooterContext } from '@/contexts';

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

type TargetAPI = {
  name: string;
  coordinates: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
};

const Game = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [dotSize, setDotSize] = useState(0);
  const [clickCoordinates, setClickCoordinates] = useState({
    x: 0,
    y: 0,
    clickMinX: 0,
    clickMaxX: 0,
    clickMinY: 0,
    clickMaxY: 0,
  });
  const [targets, setTargets] = useState<TargetAPI[]>();
  const [charactersFound, setCharactersFound] = useState<string[]>([]);
  const [gameOverDialogOn, setGameOverDialogOn] = useState(false);
  const [stopwatchRunning, setStopwatchRunning] = useState(true);
  const [parentTime, setParentTime] = useState(0);

  const { toast } = useToast();
  const { game } = useContext(GameContext);
  const { setNav, setFooter } = useContext(NavFooterContext);
  const navigate = useNavigate();
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!game) {
      navigate('/');
    }
  }, [game, navigate]);

  const getTargetCoordinates = async () => {
    try {
      const targets = await axios.get(
        `http://localhost:3001/api/games/${game?.name}/targets`
      );
      setTargets(targets.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTargetCoordinates();
    setStopwatchRunning(true);
  }, []);

  useEffect(() => {
    setNav(
      <>
        <Stopwatch
          stopwatchRunning={stopwatchRunning}
          setParentTime={setParentTime}
        />
        <Link className={buttonVariants({ variant: 'secondary' })} to='/'>
          Back to menu
        </Link>
      </>
    );
    setFooter(
      <div className='text-primary-foreground flex items-center justify-center gap-6'>
        <p className='hidden md:block'>You need to find:</p>
        {game?.targets.map(
          ({ name, src }, index) =>
            !charactersFound.includes(name) && (
              <div className='flex gap-2 items-center font-bold' key={index}>
                <img
                  src={src}
                  alt={`target ${index + 1}`}
                  width={40}
                  className='min-h-10 max-h-10 object-cover'
                />
                <p>{name}</p>
              </div>
            )
        )}
      </div>
    );
  }, [charactersFound]);

  const gameOver = () => {
    setStopwatchRunning(false);
    setGameOverDialogOn(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    setIsClicked(!isClicked);

    const rect = imageRef.current?.getBoundingClientRect();

    const image = imageRef.current;
    const imageWidth = image?.width || 0;
    const imageHeight = image?.height || 0;

    const dotSize = Math.min(imageWidth, imageHeight) * 0.065;
    setDotSize(dotSize);

    if (rect) {
      const x = ((e.clientX - rect.left - dotSize / 2) / imageWidth) * 100;
      const y = ((e.clientY - rect.top - dotSize / 2) / imageHeight) * 100;

      const xDotSizeOffset = (dotSize / 2 / imageWidth) * 100;
      const yDotSizeOffset = (dotSize / 2 / imageHeight) * 100;
      const clickMinX = x - xDotSizeOffset;
      const clickMaxX = x + xDotSizeOffset;
      const clickMinY = y - yDotSizeOffset;
      const clickMaxY = y + yDotSizeOffset;

      setClickCoordinates({ x, y, clickMinX, clickMaxX, clickMinY, clickMaxY });
    }
  };

  const handleSubmit = (targetName: string) => {
    const targetClicked = targets?.find(
      (target) => target.name === targetName
    ) as TargetAPI;

    const {
      minX: targetMinX,
      maxX: targetMaxX,
      minY: targetMinY,
      maxY: targetMaxY,
    } = targetClicked.coordinates;
    const { clickMinX, clickMaxX, clickMinY, clickMaxY } = clickCoordinates;

    const overlapX = targetMaxX > clickMinX && targetMinX < clickMaxX;
    const overlapY = targetMaxY > clickMinY && targetMinY < clickMaxY;

    if (overlapX && overlapY) {
      const charactersFoundArr = [...charactersFound, targetName];
      setCharactersFound(charactersFoundArr);
      toast({ title: 'Found!', description: `You found ${targetName}!` });

      if (charactersFoundArr.length >= (game?.targets.length || 0)) {
        gameOver();
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Not Found!',
        description: `You didn't find ${targetName}!`,
      });
    }

    setIsClicked(!isClicked);
  };

  return (
    <div className={`w-fit mx-auto cursor-pointer relative`}>
      <img
        ref={imageRef}
        src={game?.imageSrc}
        alt={game?.name}
        onClick={handleClick}
        className='w-full bg-white'
      />
      {isClicked && (
        <>
          <Dot clickCoordinates={clickCoordinates} dotSize={dotSize} />
          <DropdownMenu
            game={game as Game}
            charactersFound={charactersFound}
            clickCoordinates={clickCoordinates}
            dotSize={dotSize}
            handleSubmit={handleSubmit}
          />
        </>
      )}
      {gameOverDialogOn && <GameOverDialog time={parentTime} />}
    </div>
  );
};

export default Game;
