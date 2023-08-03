import { Question } from './App';

function Options({ question }: { question: Question }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button type="button" className="btn btn-option" key={option}>
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
