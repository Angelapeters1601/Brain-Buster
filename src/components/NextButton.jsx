function NextButton({ dispatch, index, answer }) {
  if (answer === null) return null;
  return (
    <div>
      <button
        className="next-btn"
        onClick={() => dispatch({ type: "NextQuestion" })}
      >
        next
      </button>
    </div>
  );
}

export default NextButton;
