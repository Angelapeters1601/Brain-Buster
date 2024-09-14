// function Progress({ numQuestions, index, answer, points, maxPossiblePoint }) {
//   return (
//     <div className="progress">
//       <progress
//         max={numQuestions}
//         value={index + Number(answer !== null)}
//       ></progress>

//       <div className="progress-info">
//         <p>
//           <strong>{index + 1}</strong> /{numQuestions}
//         </p>
//         <p>
//           <strong>{points}</strong>/ {maxPossiblePoint}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Progress;
import { motion } from "framer-motion";

function Progress({ numQuestions, index, answer, points, maxPossiblePoint }) {
  // Calculate the current progress value
  const progressValue = index + Number(answer !== null);

  // Define animation variants
  const progressVariants = {
    hidden: { width: "0%", opacity: 0 }, // Start invisible and with 0% width
    visible: {
      width: "100%", // Expand to full width
      opacity: 1, // Fully visible
      transition: {
        duration: 0.5, // Duration of the animation
        ease: "easeInOut", // Smooth easing effect
      },
    },
  };

  return (
    <div className="progress">
      <motion.div
        className="progress-bar" // Apply your existing CSS class
        initial="hidden"
        animate="visible"
        variants={progressVariants}
      >
        <progress max={numQuestions} value={progressValue}></progress>
      </motion.div>

      <div className="progress-info">
        <p>
          <strong>{index + 1}</strong> / {numQuestions}
        </p>
        <p>
          <strong>{points}</strong> / {maxPossiblePoint}
        </p>
      </div>
    </div>
  );
}

export default Progress;
