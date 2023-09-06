import { Question, QuizActionKind } from '../Interfaces/interfaces';
import { useQuiz } from '../contexts/QuizContext';

interface OptionsProps {
  question: Question;
}

function Options({ question }: OptionsProps) {
  const { answer, dispatch } = useQuiz();
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
