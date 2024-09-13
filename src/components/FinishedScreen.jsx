import { IoArrowUndo } from "react-icons/io5";

function FinishedScreen({ dispatch, points, maxPossiblePoint }) {
  const percentage = (points / maxPossiblePoint) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇  Congratulations Brain-Buster Champion!";
  if (percentage >= 80 && percentage < 100) emoji = "🎉  Bravo!";
  if (percentage >= 50 && percentage < 80) emoji = "😊  Well Played!";
  if (percentage >= 0 && percentage < 50)
    emoji = "🤔 You can do better brainiac!";
  if (percentage === 0) emoji = "🤦‍♀️ Oops!";

  return (
    <>
      <button
        className="back-home-btn finish-btn"
        onClick={() => dispatch({ type: "BackHome" })}
      >
        <IoArrowUndo />
      </button>
      <div className="finished-screen">
        <p>{emoji}</p>
        <h2>
          You scored {points} points out of {maxPossiblePoint} - (
          {Math.ceil(percentage)}%)
        </h2>
        <button
          className="btn restart-btn"
          onClick={() => dispatch({ type: "Restart" })}
        >
          Restart Quiz
        </button>
      </div>
    </>
  );
}

export default FinishedScreen;
