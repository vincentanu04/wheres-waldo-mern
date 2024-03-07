import { GameContext } from '@/contexts/gameContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export type Game = {
  id: number;
  name: string;
  imageSrc: string;
};

const Game = () => {
  const { game } = useContext(GameContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!game) {
      navigate('/');
    }
  }, [game, navigate]);

  return (
    <div className='w-fit mx-auto'>
      <img src={game?.imageSrc} alt={game?.name} />
    </div>
  );
};

export default Game;
