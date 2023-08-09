import { QuizActionKind } from '../Interfaces/interfaces';

interface FinishScreenProps {
  points: number;
  maxNumPoints: number;
  highScore: number;
  dispatch: any;
}
function FinishScreen({
  points,
  maxNumPoints,
  highScore,
  dispatch,
}: FinishScreenProps) {
  const percentage = (points / maxNumPoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> points out of {maxNumPoints} (
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
