function NextButton({ dispatch, index, answer, numQuestions }) {
  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button
        className="next-btn"
        onClick={() => dispatch({ type: "NextQuestion" })}
      >
        next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button className="next-btn" onClick={() => dispatch({ type: "Finish" })}>
        Finish
      </button>
    );
}

export default NextButton;
