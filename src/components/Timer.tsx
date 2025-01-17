import Container from './UI/Container.tsx';
import { Timer as TimerProps, useTimersContext } from '../store/timers-context.tsx';
import { useEffect, useRef, useState } from 'react';

export default function Timer({name, duration}: TimerProps) {

  const [remainingTime, setRemainingState] = useState(duration * 1000);
  const interval = useRef<number | null>(null);
  const {isRinning} = useTimersContext()

  if(remainingTime <= 0 && interval.current){
    clearInterval(interval.current)
  }

  useEffect(()=>{
    let timer: number;
    if(isRinning){
      timer = setInterval(function () {
        setRemainingState((prevTime) => {
          if (prevTime <= 0) {
            return prevTime;
          }
          return prevTime - 50;
        });
      }, 50)

      interval.current = timer;
    }
    else if (!isRinning && interval.current){
      clearInterval(interval.current)
    }

    return ()=> clearInterval(timer);
  }, [isRinning]);

  const formattedRemaningTime = (remainingTime / 1000).toFixed(2);

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p><progress max={duration * 1000} value={remainingTime} /></p>
      <p>{formattedRemaningTime}</p>
    </Container>
  );
}
