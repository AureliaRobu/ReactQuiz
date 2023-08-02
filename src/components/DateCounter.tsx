import { useReducer } from 'react';

// An enum with all the types of actions to use in our reducer
enum CountActionKind {
  INCREASE = 'inc',
  DECREASE = 'dec',
  SETCOUNT = 'setCount',
  SETSTEP = 'setStep',
  RESET = 'reset',
}

// An interface for our actions
interface CountAction {
  type: CountActionKind;
  payload: number;
}
const initialState = { count: 0, step: 1 };

function reducer(state: { count: number; step: number }, action: CountAction) {
  console.log(state, action);
  switch (action.type) {
    case CountActionKind.INCREASE:
      return { ...state, count: state.count + state.step };
    case CountActionKind.DECREASE:
      return { ...state, count: state.count - state.step };
    case CountActionKind.SETCOUNT:
      return { ...state, count: action.payload };
    case CountActionKind.SETSTEP:
      return { ...state, step: action.payload };
    case CountActionKind.RESET:
      return initialState;
    default:
      throw new Error('Invalid action type');
  }
  return state;
}
function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: CountActionKind.DECREASE, payload: state.step });
  };

  const inc = function () {
    dispatch({ type: CountActionKind.INCREASE, payload: state.step });
  };

  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: CountActionKind.SETCOUNT,
      payload: Number(e.target.value),
    });
  };

  const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: CountActionKind.SETSTEP,
      payload: Number(e.target.value),
    });
  };

  const reset = function () {
    dispatch({ type: CountActionKind.RESET, payload: 0 });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button type="button" onClick={dec}>
          -
        </button>
        <input value={count} onChange={defineCount} />
        <button type="button" onClick={inc}>
          +
        </button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
export default DateCounter;
