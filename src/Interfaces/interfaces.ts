export enum QuizActionKind {
  DataReceived = 'dataReceived',
  ErrorAction = 'error',
  Start = 'start',
  NewAnswer = 'newAnswer',
  NewQuestion = 'newQuestion',
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
}

// export interface QuizAction {
//   type: QuizActionKind;
//   payload: Question[] | number;
// }
export type QuizAction =
  | { type: QuizActionKind.DataReceived; payload: Question[] }
  | { type: QuizActionKind.ErrorAction }
  | { type: QuizActionKind.Start }
  | { type: QuizActionKind.NewAnswer; payload: number }
  | { type: QuizActionKind.NewQuestion };
