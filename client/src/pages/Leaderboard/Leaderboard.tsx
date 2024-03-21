import { ScrollArea, Separator } from '@/components/ui';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Leaderboard = () => {
  const { gameName } = useParams();
  const [leaderboardData, setLeaderboardData] = useState();

  const getLeaderboardData = async () => {
    // try {
    const { data: leaderboardData } = await axios.get(
      `http://localhost:3001/api/games/${gameName}/leaderboard`
    );
    setLeaderboardData([
      'HAHAHA',
      'HAHAHA',
      'HAHAHA',
      'HAHAHA',
      'HAHAHA',
      'HAHAHA',
      'HAHAHA',
      'HAHAHA',
      'HAHAHA',
      'HAHAHA',
      'HAHAHA',
      'HAHAHA',
      'HAHAHA',
    ]);
    // } catch (err) {
    // console.log(err);
    // }
  };

  useEffect(() => {
    getLeaderboardData();
  }, []);

  return (
    <div className='min-h-full flex items-center justify-center'>
      <ScrollArea className='text-primary-foreground w-1/2 rounded-md border p-4'>
        {leaderboardData ? (
          leaderboardData.map((data) => (
            <>
              {data}
              <Separator className='my-2' />
            </>
          ))
        ) : (
          <></>
        )}
      </ScrollArea>
    </div>
  );
};

export default Leaderboard;
