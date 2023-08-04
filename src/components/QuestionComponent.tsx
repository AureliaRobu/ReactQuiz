import { Question } from '../Interfaces/interfaces';
import Options from './Options';

interface QuestionComponentProps {
  question: Question;
  dispatch: any;
  answer: number | null;
}

function QuestionComponent({
  question,
  dispatch,
  answer,
}: QuestionComponentProps) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default QuestionComponent;
