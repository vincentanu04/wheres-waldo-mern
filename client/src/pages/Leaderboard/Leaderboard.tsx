import { useParams } from 'react-router-dom';

const Leaderboard = () => {
  const { gameName } = useParams();
  return <p className='text-primary-foreground'>{gameName}</p>;
};

export default Leaderboard;
