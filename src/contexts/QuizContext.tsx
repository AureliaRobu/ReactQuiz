import { createContext, useContext, useEffect, useReducer } from 'react';
import {
  Question,
  QuizAction,
  QuizActionKind,
  State,
} from '../Interfaces/interfaces';

interface QuizContextData {
  questions: any[];
  status: string;
  index: number;
  answer: number | null;
  points: number;
  highScore: number;
  secondsLeft: number | null;
  numQuestions: number;
  maxPossiblePoints: number;
  dispatch: any;
}
const QuizContext = createContext<QuizContextData>({} as QuizContextData);

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

function QuizProvider({ children }: any) {
  const [
    { questions, status, index, answer, points, highScore, secondsLeft },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc: number, question: Question) => acc + question.points,
    0
  );
  useEffect(
    function () {
      fetch('http://localhost:8000/questions')
        .then((response) => response.json())
        .then((data) =>
          dispatch({ type: QuizActionKind.DataReceived, payload: data })
        )
        .catch(() => dispatch({ type: QuizActionKind.ErrorAction }));
    },
    [dispatch]
  );

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsLeft,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}

export { QuizProvider, useQuiz };
