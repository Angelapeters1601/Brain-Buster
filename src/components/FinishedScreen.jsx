import { IoArrowUndo } from "react-icons/io5";
import { motion } from "framer-motion";

function FinishedScreen({ dispatch, points, maxPossiblePoint, highscore }) {
  const percentage = (points / maxPossiblePoint) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇  Congratulations Brain-Buster Champion!";
  if (percentage >= 80 && percentage < 100) emoji = "🎉  Bravo!";
  if (percentage >= 50 && percentage < 80) emoji = "😊  Well Played!";
  if (percentage >= 0 && percentage < 50)
    emoji = "🤔 You can do better brainiac!";
  if (percentage === 0) emoji = "🤦‍♀️ Oops!";

  // Animation variants for the entire container
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15, delay: 0.3 },
    },
  };

  // Animation variants for the emoji
  const emojiVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1.3,
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 12, delay: 0.5 },
    },
  };

  // Animation variants for buttons
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <motion.button
        className="back-home-btn finish-btn"
        onClick={() => dispatch({ type: "BackHome" })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <IoArrowUndo />
      </motion.button>

      <motion.div
        className="finished-screen"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="emoji"
          variants={emojiVariants}
          initial="hidden"
          animate="visible"
        >
          {emoji}
        </motion.p>

        <motion.h2>
          You scored {points} points out of {maxPossiblePoint} (
          {Math.ceil(percentage)}%)
        </motion.h2>
        <p>(Highscore: {highscore})</p>

        <motion.button
          className="btn restart-btn"
          onClick={() => dispatch({ type: "Restart" })}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Restart Quiz
        </motion.button>
      </motion.div>
    </>
  );
}

export default FinishedScreen;
