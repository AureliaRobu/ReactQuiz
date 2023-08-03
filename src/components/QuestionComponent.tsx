import { Question } from './App';
import Options from './Options';

function QuestionComponent({ question }: { question: Question }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default QuestionComponent;
