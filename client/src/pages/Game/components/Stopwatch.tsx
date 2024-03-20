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
      intervalId = setInterval(() => setTime(time + 1), 10);
      setParentTime(time + 1);
    }
    return () => clearInterval(intervalId);
  }, [time, stopwatchRunning]);

  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = time % 100;

  return (
    <p className='text-primary-foreground font-bold self-center'>
      Time taken: {hours}:{minutes.toString().padStart(2, '0')}:
      {seconds.toString().padStart(2, '0')}:
      {milliseconds.toString().padStart(2, '0')}
    </p>
  );
};

export default Stopwatch;
