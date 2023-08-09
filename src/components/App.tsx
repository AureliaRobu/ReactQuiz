import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import QuestionComponent from './QuestionComponent';
import {
  State,
  QuizAction,
  QuizActionKind,
  Question,
} from '../Interfaces/interfaces';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import NextButton from './NextButton';
import Timer from './Timer';

const SECS_PER_QUESTION = 30;

const initialState: State = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsLeft: null,
};

function reducer(state: State, action: QuizAction): State {
  const question = state.questions[state.index];

  switch (action.type) {
    case QuizActionKind.DataReceived:
      return { ...state, questions: action.payload, status: 'ready' };
    case QuizActionKind.ErrorAction:
      return { ...state, status: 'error' };
    case QuizActionKind.Start:
      return {
        ...state,
        status: 'active',
        secondsLeft: state.questions.length * SECS_PER_QUESTION,
      };
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
    case QuizActionKind.Finish:
      return {
        ...state,
        status: 'finished',
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case QuizActionKind.Reset:
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      };
    case QuizActionKind.TimeOut:
      return {
        ...state,
        secondsLeft: state.secondsLeft ? state.secondsLeft - 1 : null,
        status: state.secondsLeft === 0 ? 'finished' : state.status,
      };
    default:
      throw new (Error as any)('Invalid action type');
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highScore, secondsLeft },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc: number, question: Question) => acc + question.points,
    0
  );
  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: QuizActionKind.DataReceived, payload: data })
      )
      .catch(() => dispatch({ type: QuizActionKind.ErrorAction }));
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
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <QuestionComponent
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsLeft={secondsLeft} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            points={points}
            maxNumPoints={maxPossiblePoints}
            dispatch={dispatch}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}
