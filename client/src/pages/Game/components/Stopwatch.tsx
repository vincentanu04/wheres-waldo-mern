import { useEffect, useState } from 'react';

interface StopwatchProps {
  stopwatchRunning: boolean;
  setParentTime: (time: number) => void;
}
const Stopwatch = ({ stopwatchRunning, setParentTime }: StopwatchProps) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (stopwatchRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          setParentTime(newTime);
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [stopwatchRunning, setParentTime]);

  // Minutes calculation
  const minutes = Math.floor(time / 60);

  // seconds calculation
  const seconds = time % 60;

  return (
    <p className='text-primary-foreground font-bold self-center'>
      Time taken: {minutes.toString().padStart(2, '0')}:
      {seconds.toString().padStart(2, '0')}
    </p>
  );
};

export default Stopwatch;
