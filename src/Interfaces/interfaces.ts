export enum QuizActionKind {
  DataReceived = 'dataReceived',
  ErrorAction = 'error',
  Start = 'start',
  NewAnswer = 'newAnswer',
  NewQuestion = 'newQuestion',
  Finish = 'finish',
  Reset = 'reset',
  TimeOut = 'timeOut',
}

export interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}
export interface State {
  questions: Question[] | [];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
  index: number;
  answer: null | number;
  points: number;
  highScore: number;
  secondsLeft: number | null;
}

export type QuizAction =
  | { type: QuizActionKind.DataReceived; payload: Question[] }
  | { type: QuizActionKind.ErrorAction }
  | { type: QuizActionKind.Start }
  | { type: QuizActionKind.NewAnswer; payload: number }
  | { type: QuizActionKind.NewQuestion }
  | { type: QuizActionKind.Finish }
  | { type: QuizActionKind.Reset }
  | { type: QuizActionKind.TimeOut };
