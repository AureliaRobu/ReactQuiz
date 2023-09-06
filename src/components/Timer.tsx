import { useEffect } from 'react';
import { QuizActionKind } from '../Interfaces/interfaces';
import { useQuiz } from '../contexts/QuizContext';

function Timer() {
  const { secondsLeft, dispatch } = useQuiz();
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
