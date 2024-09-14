import { motion } from "framer-motion";

function NextButton({ dispatch, index, answer, numQuestions }) {
  if (answer === null) return null;

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  if (index < numQuestions - 1)
    return (
      <motion.button
        className="next-btn"
        onClick={() => dispatch({ type: "NextQuestion" })}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeVariants}
      >
        Next
      </motion.button>
    );

  if (index === numQuestions - 1)
    return (
      <motion.button
        className="next-btn"
        onClick={() => dispatch({ type: "Finish" })}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeVariants}
      >
        Finish
      </motion.button>
    );
}

export default NextButton;
