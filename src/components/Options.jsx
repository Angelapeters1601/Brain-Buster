import { useEffect, useState } from "react";

function Options({ questions, dispatch, answer }) {
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const hasAnswered = answer !== null;

  // Function to shuffle the array of answers
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Decode HTML entities like &#039; into proper characters (e.g., Noah's Ark)
  const decodeHtmlEntities = (str) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
  };

  useEffect(() => {
    // Combine the correct answer and incorrect answers into one array
    const allOptions = [
      ...questions.incorrect_answers.map(decodeHtmlEntities), // Decode incorrect answers
      decodeHtmlEntities(questions.correct_answer), // Decode correct answer
    ];

    // Shuffle the array
    setShuffledOptions(shuffleArray(allOptions));
  }, [questions]);

  return (
    <div className="options">
      {shuffledOptions.map((option) => {
        const isCorrect =
          option === decodeHtmlEntities(questions.correct_answer);
        const isChosen = option === answer;
        return (
          <button
            key={option}
            disabled={hasAnswered}
            className={`option ${
              hasAnswered
                ? isCorrect
                  ? "correct"
                  : isChosen
                  ? "incorrect"
                  : "answer"
                : ""
            }`}
            onClick={() => dispatch({ type: "NewAnswer", payload: option })}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
