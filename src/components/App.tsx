import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';

interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}
interface State {
  questions: Question[];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
}

interface QuizAction {
  type: QuizActionKind;
  payload: Question[];
}
const initialState = {
  questions: [],
  status: 'loading',
};

enum QuizActionKind {
  DataReceived = 'dataReceived',
  Error = 'error',
}

function reducer(state: State, action: QuizAction) {
  switch (action.type) {
    case QuizActionKind.DataReceived:
      return { ...state, questions: action.payload, status: 'ready' };
    case QuizActionKind.Error:
      return { ...state, status: 'error' };
    default:
      throw new Error('Invalid action type');
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
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
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}
