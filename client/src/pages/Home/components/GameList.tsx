import { Game } from '@/pages/Game/Game';
import GameCard from './GameCard';
import React from 'react';
import games from '@/lib/games';

const MemoizedGameCard = React.memo(({ game }: { game: Game }) => (
  <GameCard game={game} key={game.id} />
));

const GameList = () => {
  return (
    <div className='flex flex-col md:flex-row gap-6 justify-center flex-wrap'>
      {games.map((game) => (
        <MemoizedGameCard game={game} key={game.id} />
      ))}
    </div>
  );
};

export default GameList;
