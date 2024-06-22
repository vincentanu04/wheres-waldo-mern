import { useEffect, useRef, useState } from 'react';

interface StopwatchProps {
  stopwatchRunning: boolean;
  setParentTime: (time: number) => void;
}

const Stopwatch = ({ stopwatchRunning, setParentTime }: StopwatchProps) => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (stopwatchRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          setParentTime(newTime);
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }

    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    };
  }, [stopwatchRunning, setParentTime]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <p className='text-primary-foreground font-bold self-center'>
      Time taken: {minutes.toString().padStart(2, '0')}:
      {seconds.toString().padStart(2, '0')}
    </p>
  );
};

export default Stopwatch;
