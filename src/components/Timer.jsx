// import React, { useEffect } from "react";

// function Timer({ dispatch, secondsRemaining }) {
//   const mins = Math.floor(secondsRemaining / 60);
//   const seconds = secondsRemaining % 60;

//   useEffect(() => {
//     const id = setInterval(() => {
//       dispatch({ type: "Tick" });
//     }, 1000);
//     return () => clearInterval(id);
//   }, [dispatch]);

//   return (
//     <div className="timer">
//       {mins < 10 && "0"}
//       {mins}:{seconds < 10 && "0"}
//       {seconds}
//     </div>
//   );
// }

// export default Timer;
import React, { useEffect } from "react";
import { motion } from "framer-motion"; // Import framer-motion

function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "Tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  // Animation variants for sliding in from the left
  const slideInVariants = {
    hidden: { x: -100, opacity: 0 }, // Start off-screen to the left
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 70, damping: 15 },
    },
  };

  return (
    <motion.div
      className="timer"
      variants={slideInVariants}
      initial="hidden"
      animate="visible"
    >
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </motion.div>
  );
}

export default Timer;
