import { IoArrowUndo } from "react-icons/io5";

function LevelSelector({
  dispatch,
  selectedSubject,
  noOfQuestions,
  difficultyLevel,
}) {
  return (
    <>
      <div className="level-selector subject-selector">
        <button
          className="back-home-btn"
          onClick={() => dispatch({ type: "BackToSubjects" })}
        >
          <IoArrowUndo />
        </button>

        <h2>Select level of difficulty 😈</h2>
      </div>
      <div className="level-selector-title">
        <h2>
          Dive into the world of <span> {selectedSubject}</span>
        </h2>
      </div>
      <div className="select-level">
        <select
          className="select"
          value={difficultyLevel}
          onChange={(e) =>
            dispatch({ type: "SelectedDifficulty", payload: e.target.value })
          }
        >
          <option value="">Select difficulty</option>
          <option value="easy">Easy 👶</option>
          <option value="medium">Medium 👤</option>
          <option value="hard">Hard 😯</option>
        </select>

        <div className="select-level-input">
          <label htmlFor="questions">Chose No of questions</label>
          <input
            type="range"
            value={noOfQuestions}
            min="1"
            max="30"
            onChange={(e) =>
              dispatch({
                type: "SelectedNoOfQuestion",
                payload: e.target.value,
              })
            }
          />
          <p>{noOfQuestions}</p>
        </div>
      </div>
      {difficultyLevel && noOfQuestions ? (
        <button
          className="start-quiz btn"
          onClick={() => dispatch({ type: "StartQuiz" })}
        >
          Start Quiz
        </button>
      ) : null}
    </>
  );
}

export default LevelSelector;
