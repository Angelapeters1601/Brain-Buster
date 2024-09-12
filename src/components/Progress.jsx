function Progress({ numQuestions, index, answer, points, maxPossiblePoint }) {
  return (
    <div className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>

      <div className="progress-info">
        <p>
          <strong>{index + 1}</strong> /{numQuestions}
        </p>
        <p>
          <strong>{points}</strong>/ {maxPossiblePoint}
        </p>
      </div>
    </div>
  );
}

export default Progress;
