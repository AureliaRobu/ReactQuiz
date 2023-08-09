import { useEffect } from 'react';
import { QuizActionKind } from '../Interfaces/interfaces';

interface TimerProps {
  dispatch: any;
  secondsLeft: number | null;
}

function Timer({ dispatch, secondsLeft }: TimerProps) {
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: QuizActionKind.TimeOut });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && 0}
      {mins}:{secs < 10 && 0}
      {secs}
    </div>
  );
}

export default Timer;
