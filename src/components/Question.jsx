import Options from "./Options";

function decodeHTMLEntities(text) {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(text, "text/html").body
    .textContent;
  return decodedString;
}

function Question({ questions, answer, dispatch, index }) {
  return (
    <div className="question">
      <div>
        <h2>{decodeHTMLEntities(questions.question)}</h2>
        <Options
          questions={questions}
          answer={answer}
          dispatch={dispatch}
          index={index}
        />
      </div>
    </div>
  );
}

export default Question;
