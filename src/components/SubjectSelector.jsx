import { IoArrowUndo } from "react-icons/io5";

function SubjectSelector({ dispatch, subjects }) {
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
          <div key={subject.id}>
            <button
              className="subject-select-btn"
              onClick={() =>
                dispatch({
                  type: "CategorySelected",
                  payload: { id: subject.id, name: subject.name },
                })
              }
            >
              {subject.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default SubjectSelector;
