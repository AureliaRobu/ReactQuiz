import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import QuestionComponent from './QuestionComponent';

export interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}
interface State {
  questions: Question[];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
  index: number;
}

interface QuizAction {
  type: QuizActionKind;
  payload: Question[];
}
const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
};

export enum QuizActionKind {
  DataReceived = 'dataReceived',
  ErrorAction = 'error',
  Start = 'start',
}

function reducer(state: State, action: QuizAction) {
  switch (action.type) {
    case QuizActionKind.DataReceived:
      return { ...state, questions: action.payload, status: 'ready' };
    case QuizActionKind.ErrorAction:
      return { ...state, status: 'error' };
    case QuizActionKind.Start:
      return { ...state, status: 'active' };
    default:
      throw new Error('Invalid action type');
  }
}

export default function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: QuizActionKind.DataReceived, payload: data })
      )
      .catch((error) => dispatch({ type: QuizActionKind.Error, payload: [] }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <QuestionComponent question={questions[index]} />
        )}
      </Main>
    </div>
  );
}
