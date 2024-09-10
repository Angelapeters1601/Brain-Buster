import { IoArrowUndo } from "react-icons/io5";

function SubjectSelector({ dispatch }) {
  const subjects = [
    "General Knowledge",
    "Computer",
    "Mythology",
    "Nature",
    "Sports",
    "History",
    "Animals",
  ];
  return (
    <>
      <div className="subject-selector">
        <button
          className="back-home-btn"
          onClick={() => dispatch({ type: "BackHome" })}
        >
          <IoArrowUndo />
        </button>
        <h2>Ready for a challenge ? Choose your quiz !</h2>
      </div>
      {/* *************************** */}
      <div className="subject-select-container">
        {subjects.map((subject) => (
          <div key={subject}>
            <button
              className="subject-select-btn"
              onClick={() =>
                dispatch({ type: "LevelAndQty", payload: subject })
              }
            >
              {subject}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default SubjectSelector;
