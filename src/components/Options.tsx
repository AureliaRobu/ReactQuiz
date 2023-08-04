import { Question, QuizActionKind } from '../Interfaces/interfaces';

interface OptionsProps {
  question: Question;
  dispatch: any;
  answer: number | null;
}

function Options({ question, dispatch, answer }: OptionsProps) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          type="button"
          className={`btn btn-option ${answer === index ? 'answer' : ''} ${
            hasAnswered
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() =>
            dispatch({ type: QuizActionKind.NewAnswer, payload: index })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
