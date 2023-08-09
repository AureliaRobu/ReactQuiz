import { QuizActionKind } from '../Interfaces/interfaces';

interface NextButtonProps {
  dispatch: any;
  answer: number | null;
  index: number;
  numQuestions: number;
}

function NextButton({
  dispatch,
  answer,
  index,
  numQuestions,
}: NextButtonProps) {
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
