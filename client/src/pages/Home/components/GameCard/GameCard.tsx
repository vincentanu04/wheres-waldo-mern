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
  };
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <Card className='w-full md:w-[25%] flex flex-col content-center items-center'>
      <CardHeader>
        <CardTitle>{game.name}</CardTitle>
      </CardHeader>
      <CardContent>GAME {game.id}</CardContent>
      <CardFooter>
        <Link
          to={`/game/${game.id}`}
          className={buttonVariants({ variant: 'secondary' })}
        >
          Start
        </Link>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
