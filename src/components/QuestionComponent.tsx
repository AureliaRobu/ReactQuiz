import { Question } from '../Interfaces/interfaces';
import Options from './Options';
import { useQuiz } from '../contexts/QuizContext';

function QuestionComponent() {
  const { questions, index } = useQuiz();
  const question: Question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default QuestionComponent;
