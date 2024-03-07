import { Game } from '@/pages/Game/Game';
import { GameCard } from '../GameCard';

const games: Game[] = [
  {
    id: 1,
    name: 'Meme Supreme',
    imageSrc: '/assets/games/meme/meme.jpg',
    targets: [
      { name: 'Waldo', src: '/assets/games/meme/waldo.jpg' },
      { name: 'Elmo', src: '/assets/games/meme/elmo.jpeg' },
      { name: 'Donkey Kong', src: '/assets/games/meme/donkeykong.jpeg' },
    ],
  },
  {
    id: 2,
    name: 'Quantum City',
    imageSrc: '/assets/games/city/city.jpg',
    targets: [],
  },
  {
    id: 3,
    name: 'Red & Blue',
    imageSrc: '/assets/games/red&blue/red&blue.jpg',
    targets: [],
  },
];

const GameList = () => {
  return (
    <div className='flex flex-col md:flex-row gap-6 items-center justify-center flex-wrap'>
      {games.map((game) => (
        <GameCard game={game} key={game.id} />
      ))}
    </div>
  );
};

export default GameList;
