import Button from './UI/Button.tsx';
import { useTimersContext } from '../store/timers-context.tsx';

export default function Header() {
  
  const timersCtx = useTimersContext();

  return (
    <header>
      <h1>ReactTimer</h1>

      <Button onClick={timersCtx.isRinning ? timersCtx.stopTimers : timersCtx.startTimers} >{timersCtx.isRinning ? 'Stop' : 'Start'} Timers</Button>
    </header>
  );
}
