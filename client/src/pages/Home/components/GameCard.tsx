import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  buttonVariants,
} from '@/components/ui';
import { GameContext } from '@/contexts';
import { Game } from '@/pages/Game/Game';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  const { setGame } = useContext(GameContext);
  return (
    <Card className='w-full md:w-auto flex flex-col content-center items-center'>
      <CardHeader>
        <CardTitle className='text-nowrap'>{game.name}</CardTitle>
      </CardHeader>
      <CardContent className='h-48 w-full'>
        <img
          src={game.imageSrc}
          alt={`${game.name} map image`}
          className='object-cover w-full h-full'
        />
      </CardContent>
      <CardFooter className='flex gap-2 flex-wrap items-center justify-center'>
        <Link
          to={`/game/${game.name}`}
          className={`${buttonVariants({
            variant: 'secondary',
          })} md:${buttonVariants({ size: 'sm' })}`}
          onClick={() => setGame(game)}
        >
          Start
        </Link>
        <Link
          to={`/game/${game.name}/leaderboard`}
          className={`${buttonVariants({ variant: 'card' })} flex gap-2`}
        >
          <img src='assets/leaderboard.svg' alt='Leaderboards' />
          Leaderboard
        </Link>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
