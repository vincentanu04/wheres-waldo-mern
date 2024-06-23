import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { GameContext } from '@/contexts';
import axios, { AxiosError } from 'axios';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useMutation, useQuery } from '@tanstack/react-query';

interface GameOverDialogProps {
  time: number;
}

const GameOverDialog = ({ time }: GameOverDialogProps) => {
  const navigate = useNavigate();
  const [updated, setUpdated] = useState<boolean>();
  const { game } = useContext(GameContext);
  const [error, setError] = useState<string>();
  const { state } = useAuthContext();
  const { user } = state;

  const { mutate: postLeaderboard, isPending } = useMutation({
    mutationFn: (data: { username: string; token: string }) => {
      return axios.post(
        `/api/games/${game?.name}/leaderboard`,
        {
          username: data.username,
          time: time,
        },
        { headers: { Authorization: `Bearer ${data.token}` } }
      );
    },
    onError: (error: AxiosError | Error) => {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
        } else {
          setError('An unexpected error occurred');
          console.log(error);
        }
      }
    },
    onSuccess: (data) => {
      setUpdated(data.data.updated);
    },
  });

  const { data: previousTime, isLoading: isPreviousTimeLoading } = useQuery({
    queryKey: ['score', game?.name, user?.username],
    queryFn: async () => {
      const resp = await axios.get(
        `/api/games/${game?.name}/leaderboard/${user?.username}`,
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      return resp.data;
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (user) {
      const { username, token } = user;
      postLeaderboard({ username, token });
    }
  }, []);

  return (
    <Dialog defaultOpen onOpenChange={() => navigate('/')}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-2 text-2xl'>Congratulations!</DialogTitle>
          <DialogDescription>
            <p className='text-primary-foreground mb-6'>
              You completed it in {time} seconds! Your previous score was{' '}
              {isPreviousTimeLoading
                ? '...'
                : previousTime
                ? previousTime
                : '...'}{' '}
              seconds.
            </p>
            {user ? (
              <div className='flex flex-col gap-4'>
                {isPending ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className='text-red-600'>{error}</p>
                ) : (
                  <p>
                    {updated
                      ? 'Your high score has been updated accordingly.'
                      : 'Your high score remains unchanged.'}
                  </p>
                )}
                <Button
                  onClick={() => {
                    navigate(`/game/${game?.name}/leaderboard`);
                  }}
                  variant={'secondary'}
                  disabled={isPending}
                >
                  Go to Leaderboard
                </Button>
              </div>
            ) : (
              <div className='flex flex-col gap-4'>
                <p>
                  Create an account to have your score tracked in the
                  leaderboard.
                </p>
                <Button
                  onClick={() => {
                    navigate(`/game/${game?.name}/leaderboard`);
                  }}
                  variant={'secondary'}
                >
                  Go to Leaderboard
                </Button>
              </div>
            )}
          </DialogDescription>
          <Dialog></Dialog>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GameOverDialog;
