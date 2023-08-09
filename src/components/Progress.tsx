interface ProgressProps {
  index: number;
  numQuestions: number;
  points: number;
  maxPossiblePoints: number;
  answer: number | null;
}
function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
}: ProgressProps) {
  return (
    <header className="progress">
      <progress value={index + Number(answer !== null)} max={numQuestions} />
      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
