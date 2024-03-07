import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  buttonVariants,
} from '@/components/ui';
import { Link } from 'react-router-dom';

interface GameCardProps {
  game: {
    id: number;
    name: string;
    imageSrc: string;
  };
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <Card className='w-full md:w-[25%] flex flex-col content-center items-center'>
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
          to={`/game/${game.id}`}
          className={`${buttonVariants({
            variant: 'secondary',
          })} md:${buttonVariants({ size: 'sm' })}`}
        >
          Start
        </Link>
        <Link
          to={`/game/${game.id}/leaderboard`}
          className={`${buttonVariants({ variant: 'card' })} flex gap-2`}
        >
          <img src='src/assets/leaderboard.svg' alt='Leaderboards' />
          Leaderboard
        </Link>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
