import { IoArrowUndo } from "react-icons/io5";
import { motion } from "framer-motion";

function SubjectSelector({ dispatch, subjects }) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 20,
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        className="subject-selector"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <button
          className="back-home-btn"
          onClick={() => dispatch({ type: "BackHome" })}
        >
          <IoArrowUndo />
        </button>
        <h2>Ready for a challenge? Choose your quiz!</h2>
      </motion.div>

      <motion.div
        className="subject-select-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {subjects.map((subject) => (
          <motion.div key={subject.id} variants={itemVariants}>
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
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

export default SubjectSelector;
