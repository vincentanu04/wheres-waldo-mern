import { GameContext } from '@/contexts/gameContext';
import React, { useContext, useEffect } from 'react';
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
  const { game } = useContext(GameContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!game) {
      navigate('/');
    }
  }, [game, navigate]);

  const handleClick = (e: React.MouseEvent) => {
    console.log(e);
  };

  return (
    <div className='w-fit mx-auto cursor-pointer'>
      <img src={game?.imageSrc} alt={game?.name} onClick={handleClick} />
    </div>
  );
};

export default Game;
