import { QuizActionKind } from '../Interfaces/interfaces';

function NextButton({ dispatch, answer }) {
  if (answer === null) return null;
  return (
    <button
      type="button"
      className="btn btn-ui"
      onClick={() => dispatch({ type: QuizActionKind.NewQuestion })}
    >
      Next
    </button>
  );
}

export default NextButton;
