import { GameCard } from '../GameCard';

const games = [
  { id: 1, name: 'Meme Supreme', imageSrc: 'src/assets/games/random.jpg' },
  { id: 2, name: 'Quantum City', imageSrc: 'src/assets/games/city.jpg' },
  { id: 3, name: 'Red & Blue', imageSrc: 'src/assets/games/red&blue.jpg' },
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
