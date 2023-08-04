import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import QuestionComponent from './QuestionComponent';
import NextButton from './NextButton';
import { State, QuizAction, QuizActionKind } from '../Interfaces/interfaces';

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state: State, action: QuizAction): State {
  const question = state.questions[state.index];

  switch (action.type) {
    case QuizActionKind.DataReceived:
      return { ...state, questions: action.payload, status: 'ready' };
    case QuizActionKind.ErrorAction:
      return { ...state, status: 'error' };
    case QuizActionKind.Start:
      return { ...state, status: 'active' };
    case QuizActionKind.NewAnswer:
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case QuizActionKind.NewQuestion:
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    default:
      throw new (Error as any)('Invalid action type');
  }
}

export default function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
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
          <>
            <QuestionComponent
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}
