import { QuizActionKind } from '../Interfaces/interfaces';
import { useQuiz } from '../contexts/QuizContext';

function NextButton() {
  const { answer, dispatch, index, numQuestions } = useQuiz();
  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button
        type="button"
        className="btn btn-ui"
        onClick={() => dispatch({ type: QuizActionKind.NewQuestion })}
      >
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button
        type="button"
        className="btn btn-ui"
        onClick={() => dispatch({ type: QuizActionKind.Finish })}
      >
        Finish
      </button>
    );
}

export default NextButton;
