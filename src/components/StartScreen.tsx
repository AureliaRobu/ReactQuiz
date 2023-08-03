import { QuizActionKind } from './App';

function StartScreen({
  numQuestions,
  dispatch,
}: {
  numQuestions: number;
  dispatch: any;
}) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        type="button"
        className="btn btn-ui"
        onClick={() => dispatch({ type: QuizActionKind.Start })}
      >
        Let&apos;s start
      </button>
    </div>
  );
}

export default StartScreen;
