import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import framer-motion

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

  // Define animation variants for options
  const optionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    selected: { scale: 1.1, transition: { duration: 0.3 } },
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -30, // Start off slightly higher
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0, // Settle to the original position
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="options"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {shuffledOptions.map((option, i) => {
        const isCorrect =
          option === decodeHtmlEntities(questions.correct_answer);
        const isChosen = option === answer;

        return (
          <motion.button
            key={i}
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
            initial="hidden"
            animate="visible"
            whileTap="selected"
            variants={optionVariants} // Apply animation variants to each option
          >
            {option}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

export default Options;
