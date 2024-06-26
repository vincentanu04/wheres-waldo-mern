import {
  ScrollArea,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { NavFooterContext } from '@/contexts';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

type leaderboardDataAPI = {
  username: string;
  time: number;
};

const Leaderboard = () => {
  const { gameName } = useParams();
  const { setNav, setFooter } = useContext(NavFooterContext);
  const { state } = useAuthContext();
  const { user } = state;

  const {
    isLoading,
    error,
    data: leaderboardData,
  } = useQuery<leaderboardDataAPI[], Error>({
    queryKey: ['leaderboardData', gameName],
    queryFn: async () => {
      const resp = await axios.get(`/api/games/${gameName}/leaderboard`);
      return resp.data;
    },
  });

  useEffect(() => {
    setNav(null);
    setFooter(null);
  }, [setNav, setFooter]);

  const getLeaderboardSkeleton = () =>
    Array.from({ length: 4 }, (_, index) => (
      <TableRow key={index}>
        <TableCell>
          <Skeleton className='h-8' />
        </TableCell>
        <TableCell>
          <Skeleton className='h-8' />
        </TableCell>
        <TableCell>
          <Skeleton className='h-8' />
        </TableCell>
      </TableRow>
    ));

  const getNoResultsFound = () => (
    <p className='text-center mt-2'>No results found..</p>
  );

  const getErrorMessage = () => (
    <p className='text-center mt-2'>An error occured..</p>
  );

  return (
    <div className='flex items-center justify-center'>
      <div className='rounded-md md:border flex flex-col justify-center items-center mt-8'>
        <h1 className='text-2xl font-bold md:mx-4 md:mt-6 text-primary-foreground sticky'>
          Leaderboard: {gameName}
        </h1>
        <ScrollArea className='text-primary-foreground md:w-fit py-4 px-4  md:h-80 min-w-full '>
          <Table className='min-w-full'>
            <TableHeader>
              <TableRow>
                <TableHead className='text-left'>Rank</TableHead>
                <TableHead className='text-left'>Username</TableHead>
                <TableHead className='text-right'>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? getLeaderboardSkeleton()
                : error
                ? getErrorMessage()
                : leaderboardData && leaderboardData.length > 0
                ? leaderboardData.map((data, index) => (
                    <TableRow
                      key={data.username}
                      className={
                        user?.username === data.username ? 'bg-slate-800' : ''
                      }
                    >
                      <TableCell className='text-left pl-5 font-bold max-w-[20px]'>
                        {index + 1}
                      </TableCell>
                      <TableCell>{data.username}</TableCell>
                      <TableCell className='text-right'>
                        {Math.floor(data.time / 60)
                          .toString()
                          .padStart(2, '0')}
                        :{(data.time % 60).toString().padStart(2, '0')}
                      </TableCell>
                    </TableRow>
                  ))
                : getNoResultsFound()}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Leaderboard;
