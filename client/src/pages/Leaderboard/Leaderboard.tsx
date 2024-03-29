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
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type leaderboardDataAPI = {
  username: string;
  time: number;
};

const Leaderboard = () => {
  const { gameName } = useParams();
  const [leaderboardData, setLeaderboardData] =
    useState<leaderboardDataAPI[]>();
  const { setNav, setFooter } = useContext(NavFooterContext);

  const getLeaderboardData = async () => {
    try {
      const { data: leaderboardData } = await axios.get(
        `http://localhost:3001/api/games/${gameName}/leaderboard`
      );
      setLeaderboardData(leaderboardData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLeaderboardData();
    setNav(null);
    setFooter(null);
  }, []);

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
              {leaderboardData ? (
                leaderboardData.length > 0 ? (
                  leaderboardData.map((data, index) => (
                    <TableRow key={data.username}>
                      <TableCell className='text-left pl-5 font-bold max-w-[20px]'>
                        {index + 1}
                      </TableCell>
                      <TableCell>{data.username}</TableCell>
                      <TableCell className='text-right'>{data.time}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <p className='text-center mt-2'>No results found..</p>
                )
              ) : (
                getLeaderboardSkeleton()
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Leaderboard;
