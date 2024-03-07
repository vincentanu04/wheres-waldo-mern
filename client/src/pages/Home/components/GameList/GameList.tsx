import { Game } from '@/pages/Game/Game';
import { GameCard } from '../GameCard';

const games: Game[] = [
  { id: 1, name: 'Meme Supreme', imageSrc: '/assets/games/random.jpg' },
  { id: 2, name: 'Quantum City', imageSrc: '/assets/games/city.jpg' },
  { id: 3, name: 'Red & Blue', imageSrc: '/assets/games/red&blue.jpg' },
];

const GameList = () => {
  return (
    <div className='flex flex-col md:flex-row gap-6 items-center justify-center flex-wrap'>
      {games.map((game) => (
        <GameCard game={game} />
      ))}
    </div>
  );
};

export default GameList;
