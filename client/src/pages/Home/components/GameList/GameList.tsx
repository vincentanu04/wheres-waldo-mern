import { GameCard } from '../GameCard';

const games = [
  { id: 1, name: '!!!!' },
  { id: 2, name: 'BOO' },
  { id: 3, name: 'HAHAH' },
  { id: 4, name: 'WHAT' },
];

const GameList = () => {
  return (
    <div className='flex flex-col md:flex-row gap-6'>
      {games.map((game) => (
        <GameCard game={game} />
      ))}
    </div>
  );
};

export default GameList;
