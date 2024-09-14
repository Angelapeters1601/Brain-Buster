import { IoArrowUndo } from "react-icons/io5";
import { motion } from "framer-motion"; // Import framer-motion

function LevelSelector({ dispatch, categoryName, amount, difficulty }) {
  // Define variants for animations
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, delay: 0.3 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, delay: 0.3 },
    },
  };

  return (
    <>
      <motion.div
        className="level-selector subject-selector"
        initial="hidden"
        animate="visible"
        variants={containerVariants} // Add animation variants for the container
      >
        <motion.button
          className="back-home-btn"
          onClick={() => dispatch({ type: "BackToSubjects" })}
          variants={buttonVariants} // Button animation
          initial="hidden"
          animate="visible"
        >
          <IoArrowUndo />
        </motion.button>

        <h2>Select level of difficulty 😈</h2>
      </motion.div>

      <motion.div
        className="level-selector-title"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2>
          Dive into the world of <span>{categoryName}</span>
        </h2>
      </motion.div>

      <motion.div
        className="select-level"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Animate the select dropdown */}
        <select
          className="select"
          value={difficulty}
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
          <label htmlFor="questions">Choose No of questions</label>
          <input
            type="range"
            value={amount}
            min="5"
            max="30"
            onChange={(e) =>
              dispatch({
                type: "SelectedNoOfQuestion",
                payload: e.target.value,
              })
            }
          />
          <p>{amount}</p>
        </div>
      </motion.div>

      {difficulty && amount ? (
        <motion.button
          className="start-quiz btn"
          onClick={() => dispatch({ type: "StartQuiz" })}
          variants={buttonVariants} // Animate the start button
          initial="hidden"
          animate="visible"
        >
          Start Quiz
        </motion.button>
      ) : null}
    </>
  );
}

export default LevelSelector;
