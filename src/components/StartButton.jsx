import { LuBrainCircuit } from "react-icons/lu";
import { IoMdArrowDropright } from "react-icons/io";
import { motion } from "framer-motion"; // Import framer-motion

function Button({ dispatch }) {
  // Define animation variants for sliding in from the bottom
  const slideInFromBottom = {
    hidden: { opacity: 0, y: 100 }, // Start off-screen at the bottom
    visible: {
      opacity: 1,
      y: 0, // Slide up to the original position
      transition: {
        type: "tween",
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="start-btn-wrapper"
      initial="hidden"
      animate="visible"
      variants={slideInFromBottom}
    >
      <LuBrainCircuit className="brain-icon brain-icon-top" />
      <button
        className="btn"
        onClick={() => dispatch({ type: "OpenSelector" })}
      >
        <p> Let's Begin </p>
        <IoMdArrowDropright />
      </button>
      <LuBrainCircuit className="brain-icon brain-icon-bottom" />
    </motion.div>
  );
}

export default Button;
