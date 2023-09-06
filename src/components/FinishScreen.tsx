import { QuizActionKind } from '../Interfaces/interfaces';
import { useQuiz } from '../contexts/QuizContext';

function FinishScreen() {
  const { points, highScore, dispatch, maxPossiblePoints } = useQuiz();
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> points out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)!
      </p>
      <p className="highscore">Highscore:{highScore}</p>
      <button
        type="button"
        className="btn btn-ui"
        onClick={() => dispatch({ type: QuizActionKind.Reset })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
